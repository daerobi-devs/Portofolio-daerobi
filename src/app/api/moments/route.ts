import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "moments.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const EXPECTED_PIN = process.env.MOMENTS_PIN || "2026";

interface MomentItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  date: string;
  location: string;
  image: string;
  aspectRatio: string;
  aspectRatioValue?: string;
  aspectClass: string;
  colSpan?: string;
  caption: string;
}

interface MomentsData {
  settings: {
    showBottomBar: boolean;
    showCategories: boolean;
    title: string;
    subtitle: string;
    description: string;
  };
  moments: MomentItem[];
}

async function readMomentsData(): Promise<MomentsData> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {
      settings: {
        showBottomBar: true,
        showCategories: true,
        title: "Moments & Chronicles",
        subtitle: "Life Beyond The Screen",
        description:
          "Koleksi visual perjalanan, ketahanan fisik di jalan raya, eksplorasi perangkat keras homelab, dan fragmen cerita personal di luar kode.",
      },
      moments: [],
    };
  }
}

async function writeMomentsData(data: MomentsData): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function verifyPin(providedPin?: string | null): boolean {
  return Boolean(providedPin && providedPin.trim() === EXPECTED_PIN.trim());
}

// GET: Return moments data (public or admin)
export async function GET() {
  const data = await readMomentsData();
  return NextResponse.json({ success: true, ...data });
}

// POST: Manage moments with PIN gate
export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  const headerPin = request.headers.get("x-moments-pin");

  // Case 1: Multipart FormData (for photo upload)
  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const pin = (formData.get("pin") as string) || headerPin;

    if (!verifyPin(pin)) {
      return NextResponse.json(
        { success: false, message: "PIN sandi salah atau tidak sah." },
        { status: 401 }
      );
    }

    const action = formData.get("action") as string;

    if (action === "upload") {
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json(
          { success: false, message: "File gambar tidak ditemukan." },
          { status: 400 }
        );
      }

      const title = (formData.get("title") as string) || "";
      const category = (formData.get("category") as string) || "life";
      const categoryLabel = (formData.get("categoryLabel") as string) || "";
      const date = (formData.get("date") as string) || new Date().getFullYear().toString();
      const location = (formData.get("location") as string) || "";
      const caption = (formData.get("caption") as string) || "";
      const aspectRatio = (formData.get("aspectRatio") as string) || "original";
      const aspectRatioValue = (formData.get("aspectRatioValue") as string) || "4/3";
      const aspectClass = (formData.get("aspectClass") as string) || "aspect-[4/3]";
      const colSpan = (formData.get("colSpan") as string) || "col-span-1";

      // Determine extension
      const isSvg =
        file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");
      const ext = isSvg ? ".svg" : ".webp";

      const sanitizedSlug = (title || "foto")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 30);
      const filename = `${Date.now()}-${sanitizedSlug}${ext}`;

      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      const targetFilePath = path.join(UPLOAD_DIR, filename);

      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(targetFilePath, buffer);

      const newMoment: MomentItem = {
        id: `moment-${Date.now()}`,
        title,
        category,
        categoryLabel,
        date,
        location,
        image: `/api/moments/image/${filename}`,
        aspectRatio,
        aspectRatioValue,
        aspectClass,
        colSpan,
        caption,
      };

      const currentData = await readMomentsData();
      // Prepend so newest is at the top
      currentData.moments.unshift(newMoment);
      await writeMomentsData(currentData);

      return NextResponse.json({
        success: true,
        message: "Momen berhasil diunggah!",
        moment: newMoment,
        data: currentData,
      });
    }

    return NextResponse.json({ success: false, message: "Aksi tidak dikenal." }, { status: 400 });
  }

  // Case 2: JSON Body
  let body: any = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON." }, { status: 400 });
  }

  const pin = body.pin || headerPin;
  if (!verifyPin(pin)) {
    return NextResponse.json(
      { success: false, message: "PIN sandi salah atau tidak sah." },
      { status: 401 }
    );
  }

  const { action } = body;

  // 1. Verify PIN only
  if (action === "verify_pin") {
    return NextResponse.json({ success: true, message: "PIN valid." });
  }

  // 2. Update Display Settings (showBottomBar, showCategories, title, subtitle, description)
  if (action === "update_settings") {
    const currentData = await readMomentsData();
    currentData.settings = {
      ...currentData.settings,
      ...body.settings,
    };
    await writeMomentsData(currentData);
    return NextResponse.json({
      success: true,
      message: "Pengaturan tampilan berhasil disimpan!",
      settings: currentData.settings,
    });
  }

  // 3. Reorder moments
  if (action === "reorder") {
    const currentData = await readMomentsData();
    if (Array.isArray(body.moments)) {
      currentData.moments = body.moments;
      await writeMomentsData(currentData);
      return NextResponse.json({
        success: true,
        message: "Tata letak urutan foto berhasil diperbarui!",
        moments: currentData.moments,
      });
    }
    return NextResponse.json({ success: false, message: "Format array moments salah." }, { status: 400 });
  }

  // 4. Edit a moment
  if (action === "edit") {
    const { id, updates } = body;
    const currentData = await readMomentsData();
    const index = currentData.moments.findIndex((m) => m.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, message: "Momen tidak ditemukan." }, { status: 404 });
    }

    currentData.moments[index] = {
      ...currentData.moments[index],
      ...updates,
    };
    await writeMomentsData(currentData);
    return NextResponse.json({
      success: true,
      message: "Momen berhasil diperbarui!",
      moment: currentData.moments[index],
      moments: currentData.moments,
    });
  }

  // 5. Delete a moment
  if (action === "delete") {
    const { id } = body;
    const currentData = await readMomentsData();
    const itemToDelete = currentData.moments.find((m) => m.id === id);

    if (itemToDelete) {
      // If the image is inside /moments/ folder, attempt to remove file
      if (itemToDelete.image.startsWith("/moments/")) {
        const localImagePath = path.join(
          process.cwd(),
          "public",
          itemToDelete.image.replace(/^\//, "")
        );
        try {
          await fs.unlink(localImagePath);
        } catch {
          // File might not exist or already removed, ignore error
        }
      }

      currentData.moments = currentData.moments.filter((m) => m.id !== id);
      await writeMomentsData(currentData);
      return NextResponse.json({
        success: true,
        message: "Momen berhasil dihapus!",
        moments: currentData.moments,
      });
    }

    return NextResponse.json({ success: false, message: "Momen tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json({ success: false, message: "Aksi tidak dikenal." }, { status: 400 });
}
