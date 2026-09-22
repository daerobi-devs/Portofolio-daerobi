import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;

  // Sanitize filename
  const safeFilename = path.basename(filename);

  // Search in uploads first, then public
  const candidatePaths = [
    path.join(process.cwd(), "public", "uploads", safeFilename),
    path.join(process.cwd(), "public", "moments", safeFilename),
    path.join(process.cwd(), "public", safeFilename),
  ];

  let filePath: string | null = null;
  for (const candidate of candidatePaths) {
    try {
      await fs.access(candidate);
      filePath = candidate;
      break;
    } catch {
      // Try next
    }
  }

  if (!filePath) {
    return new NextResponse("Image Not Found", { status: 404 });
  }

  try {
    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(safeFilename).toLowerCase();

    let contentType = "application/octet-stream";
    if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".svg") contentType = "image/svg+xml";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    return new NextResponse("Error reading image", { status: 500 });
  }
}
