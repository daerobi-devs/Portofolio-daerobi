"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ASPECT_RATIOS,
  processAndCompressImage,
} from "../../../lib/imageCompression";
import {
  Lock,
  Upload,
  Settings,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Edit2,
  Check,
  Eye,
  Sliders,
  Sparkles,
  LogOut,
  FileCode,
  GripVertical,
  Columns,
  Tag,
} from "lucide-react";

interface MomentItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  date: string;
  location: string;
  image: string;
  aspectRatio?: string;
  aspectRatioValue?: string;
  aspectClass?: string;
  colSpan?: string;
  caption: string;
}

interface MomentsSettings {
  showBottomBar: boolean;
  showCategories: boolean;
  title: string;
  subtitle: string;
  description: string;
}

export default function MomentsStudioAdminPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Tabs: "upload" | "manage" | "settings"
  const [activeTab, setActiveTab] = useState<"upload" | "manage" | "settings">(
    "upload"
  );

  // Data state
  const [moments, setMoments] = useState<MomentItem[]>([]);
  const [settings, setSettings] = useState<MomentsSettings>({
    showBottomBar: true,
    showCategories: true,
    title: "Moments & Chronicles",
    subtitle: "Life Beyond The Screen",
    description:
      "Koleksi visual perjalanan, ketahanan fisik di jalan raya, eksplorasi perangkat keras homelab, dan fragmen cerita personal di luar kode.",
  });

  // Upload Form State (100% Optional fields)
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedRatio, setSelectedRatio] = useState<string>("original");
  const [ratioValue, setRatioValue] = useState<string>("");
  const [compressionInfo, setCompressionInfo] = useState<{
    originalSize: number;
    compressedSize: number;
    isSvg: boolean;
  } | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); // Custom or empty
  const [date, setDate] = useState(new Date().getFullYear().toString());
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [colSpan, setColSpan] = useState<"col-span-1" | "col-span-2">("col-span-1");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Drag & Drop 2D State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [reorderStatus, setReorderStatus] = useState<string | null>(null);

  // Settings auto-save feedback
  const [settingsSaveStatus, setSettingsSaveStatus] = useState<string | null>(
    null
  );

  // Edit Modal State
  const [editingMoment, setEditingMoment] = useState<MomentItem | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Check saved session PIN on mount
  useEffect(() => {
    const savedPin = sessionStorage.getItem("moments_studio_pin");
    if (savedPin) {
      verifyAndLoad(savedPin);
    }
  }, []);

  const verifyAndLoad = async (inputPin: string) => {
    setIsVerifying(true);
    setPinError("");
    try {
      const res = await fetch("/api/moments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_pin", pin: inputPin }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setPin(inputPin);
        sessionStorage.setItem("moments_studio_pin", inputPin);
        loadData();
      } else {
        setPinError(data.message || "PIN salah. Silakan coba lagi.");
        sessionStorage.removeItem("moments_studio_pin");
      }
    } catch {
      setPinError("Gagal menghubungi server.");
    } finally {
      setIsVerifying(false);
    }
  };

  const loadData = async () => {
    try {
      const res = await fetch(`/api/moments?t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        if (data.moments) setMoments(data.moments);
        if (data.settings) setSettings(data.settings);
      }
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  // Collect all unique categories that exist in data for quick chip suggestion
  const existingCategories = useMemo(() => {
    return Array.from(
      new Set(
        moments
          .map((m) => m.category?.trim().toLowerCase())
          .filter((c): c is string => Boolean(c))
      )
    );
  }, [moments]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;
    verifyAndLoad(pin.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("moments_studio_pin");
    setIsAuthenticated(false);
    setPin("");
  };

  // Handle File Selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    const isSvg =
      selectedFile.type === "image/svg+xml" ||
      selectedFile.name.toLowerCase().endsWith(".svg");

    if (isSvg) {
      setCompressionInfo({
        originalSize: selectedFile.size,
        compressedSize: selectedFile.size,
        isSvg: true,
      });
      setRatioValue("auto");
    } else {
      try {
        const compressed = await processAndCompressImage(
          selectedFile,
          selectedRatio
        );
        setCompressionInfo({
          originalSize: selectedFile.size,
          compressedSize: compressed.compressedSize,
          isSvg: false,
        });
        setRatioValue(compressed.ratioValue);
      } catch (err) {
        console.error("Preview compression error", err);
      }
    }
  };

  // Handle Aspect Ratio Change
  const handleRatioChange = async (ratioKey: string) => {
    setSelectedRatio(ratioKey);
    const targetOption = ASPECT_RATIOS.find((r) => r.key === ratioKey);

    if (file && !file.name.toLowerCase().endsWith(".svg")) {
      try {
        const compressed = await processAndCompressImage(file, ratioKey);
        setCompressionInfo({
          originalSize: file.size,
          compressedSize: compressed.compressedSize,
          isSvg: false,
        });
        setRatioValue(compressed.ratioValue || targetOption?.ratioValue || "4/3");
      } catch (err) {
        console.error("Ratio update error", err);
      }
    } else if (targetOption) {
      setRatioValue(targetOption.ratioValue || "4/3");
    }
  };

  // Submit New Moment (All metadata fields are 100% optional!)
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Silakan pilih foto terlebih dahulu!");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Mengompresi foto & mengunggah...");

    try {
      const isSvg =
        file.type === "image/svg+xml" ||
        file.name.toLowerCase().endsWith(".svg");

      let fileToSend: Blob = file;
      let finalAspectClass = "aspect-[4/3]";
      let finalRatioValue = ratioValue || "4/3";

      if (!isSvg) {
        const processed = await processAndCompressImage(file, selectedRatio);
        fileToSend = processed.blob;
        finalAspectClass = processed.aspectClass;
        finalRatioValue = processed.ratioValue;
      } else {
        finalAspectClass = "aspect-auto";
        finalRatioValue = "auto";
      }

      setUploadStatus("Menyimpan ke galeri...");

      const cleanCategory = category.trim().toLowerCase();

      const formData = new FormData();
      formData.append("action", "upload");
      formData.append("pin", pin);
      formData.append(
        "file",
        fileToSend,
        file.name.replace(/\.[^/.]+$/, "") + (isSvg ? ".svg" : ".webp")
      );
      formData.append("title", title.trim());
      formData.append("category", cleanCategory);
      formData.append("categoryLabel", category.trim());
      formData.append("date", date.trim());
      formData.append("location", location.trim());
      formData.append("caption", caption.trim());
      formData.append("colSpan", colSpan);
      formData.append("aspectRatio", selectedRatio);
      formData.append("aspectRatioValue", finalRatioValue);
      formData.append("aspectClass", finalAspectClass);

      const res = await fetch("/api/moments", {
        method: "POST",
        headers: { "x-moments-pin": pin },
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setUploadStatus("Momen berhasil disimpan!");
        // Reset form
        setFile(null);
        setPreviewUrl(null);
        setTitle("");
        setCategory("");
        setLocation("");
        setCaption("");
        setColSpan("col-span-1");
        setCompressionInfo(null);
        loadData();
        setActiveTab("manage");
      } else {
        alert(result.message || "Gagal mengunggah foto.");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsUploading(false);
      setUploadStatus(null);
    }
  };

  // 2D Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const updated = [...moments];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    setMoments(updated);
    setDraggedIndex(null);
    setReorderStatus("Posisi foto berhasil diubah & tersimpan!");
    setTimeout(() => setReorderStatus(null), 2500);

    try {
      await fetch("/api/moments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-moments-pin": pin,
        },
        body: JSON.stringify({
          action: "reorder",
          pin,
          moments: updated,
        }),
      });
    } catch (err) {
      console.error("Reorder save failed", err);
    }
  };

  // Direct move to adjacent slot (Left, Right, Up, Down)
  // In a 3-column grid:
  // Left: index - 1
  // Right: index + 1
  // Up: index - 3
  // Down: index + 3
  const handleMoveTo = async (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= moments.length) return;

    const updated = [...moments];
    const temp = updated[fromIndex];
    updated[fromIndex] = updated[toIndex];
    updated[toIndex] = temp;

    setMoments(updated);
    setReorderStatus("Posisi foto berhasil ditukar!");
    setTimeout(() => setReorderStatus(null), 2500);

    try {
      await fetch("/api/moments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-moments-pin": pin,
        },
        body: JSON.stringify({
          action: "reorder",
          pin,
          moments: updated,
        }),
      });
    } catch (err) {
      console.error("Reorder save failed", err);
    }
  };

  // Toggle card column span (Normal vs Wide)
  const handleToggleColSpan = async (item: MomentItem) => {
    const newSpan = item.colSpan === "col-span-2" ? "col-span-1" : "col-span-2";
    const updated = moments.map((m) =>
      m.id === item.id ? { ...m, colSpan: newSpan } : m
    );
    setMoments(updated);

    try {
      await fetch("/api/moments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-moments-pin": pin,
        },
        body: JSON.stringify({
          action: "edit",
          pin,
          id: item.id,
          updates: { colSpan: newSpan },
        }),
      });
    } catch (err) {
      console.error("Span update error", err);
    }
  };

  // Delete Moment Item
  const handleDelete = async (id: string, momentTitle: string) => {
    if (
      !confirm(
        `Hapus momen ${
          momentTitle ? `"${momentTitle}"` : "ini"
        }? Tindakan ini tidak dapat dibatalkan.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch("/api/moments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-moments-pin": pin,
        },
        body: JSON.stringify({ action: "delete", pin, id }),
      });
      const data = await res.json();
      if (data.success) {
        setMoments(data.moments);
      } else {
        alert(data.message || "Gagal menghapus momen.");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Auto-Save Toggle Settings
  const handleToggleSetting = async (
    key: "showBottomBar" | "showCategories",
    val: boolean
  ) => {
    const newSettings = { ...settings, [key]: val };
    setSettings(newSettings);
    setSettingsSaveStatus("Menyimpan...");

    try {
      const res = await fetch("/api/moments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-moments-pin": pin,
        },
        body: JSON.stringify({
          action: "update_settings",
          pin,
          settings: newSettings,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSaveStatus("Pengaturan berhasil disimpan otomatis!");
        setTimeout(() => setSettingsSaveStatus(null), 2500);
      }
    } catch {
      setSettingsSaveStatus("Gagal menyimpan ke server.");
    }
  };

  // Save Text Header Settings
  const handleSaveTextSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaveStatus("Menyimpan teks galeri...");
    try {
      const res = await fetch("/api/moments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-moments-pin": pin,
        },
        body: JSON.stringify({
          action: "update_settings",
          pin,
          settings,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSaveStatus("Pengaturan teks berhasil disimpan!");
        setTimeout(() => setSettingsSaveStatus(null), 2500);
      }
    } catch {
      setSettingsSaveStatus("Gagal menyimpan teks.");
    }
  };

  // Save Edit Moment
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMoment) return;
    setIsSavingEdit(true);

    try {
      const res = await fetch("/api/moments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-moments-pin": pin,
        },
        body: JSON.stringify({
          action: "edit",
          pin,
          id: editingMoment.id,
          updates: {
            ...editingMoment,
            category: editingMoment.category.trim().toLowerCase(),
            categoryLabel: editingMoment.category.trim(),
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMoments(data.moments);
        setEditingMoment(null);
      } else {
        alert(data.message || "Gagal memperbarui momen.");
      }
    } catch (err) {
      console.error("Edit failed", err);
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Format bytes helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + " " + sizes[i];
  };

  // Helper for item aspect ratio
  const getItemRatio = (item: MomentItem) => {
    if (item.aspectRatioValue && item.aspectRatioValue !== "auto") {
      return item.aspectRatioValue;
    }
    if (item.aspectRatio === "1:1") return "1 / 1";
    if (item.aspectRatio === "4:5") return "4 / 5";
    if (item.aspectRatio === "3:4") return "3 / 4";
    if (item.aspectRatio === "16:9") return "16 / 9";
    return "4 / 3";
  };

  // Helper to describe 3-column slot position
  const getSlotDescription = (index: number) => {
    const col = index % 3;
    const row = Math.floor(index / 3) + 1;
    const colName = col === 0 ? "Kiri" : col === 1 ? "Tengah" : "Kanan";
    return `Baris ${row} · Kolom ${colName}`;
  };

  // ==========================================
  // VIEW 1: PIN LOCK SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0e12] flex items-center justify-center p-6 text-white selection:bg-white selection:text-black">
        <div className="w-full max-w-sm bg-[#16181f] border border-[#262833] rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto text-white border border-white/10">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Moments Studio
            </h1>
            <p className="text-xs text-neutral-400">
              Kunci sandi rahasia untuk mengelola galeri visual & foto pribadi.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                PIN Akses Admin
              </label>
              <input
                type="password"
                placeholder="Masukkan PIN (Default: 2026)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-sm focus:outline-none focus:border-white transition-colors text-center tracking-widest font-mono"
              />
            </div>

            {pinError && (
              <p className="text-xs text-rose-400 text-center font-mono">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? "Memverifikasi..." : "Buka Studio"}
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-800 text-center">
            <Link
              href="/moments"
              className="text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              ← Kembali ke Galeri Publik
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED STUDIO DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0d0e12] text-neutral-100 pb-28 selection:bg-white selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0d0e12]/90 backdrop-blur-md border-b border-[#21232c] px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/15">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white">
              Moments Studio
            </h1>
            <p className="text-[10px] font-mono text-neutral-400">
              Visual Grid Canvas & Layout Composer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/moments"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300 transition-colors border border-white/10"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lihat Web</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-xs font-mono text-rose-300 transition-colors border border-rose-500/20 cursor-pointer"
            title="Kunci / Keluar"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kunci</span>
          </button>
        </div>
      </header>

      {/* Main Studio Container */}
      <div className="max-w-6xl mx-auto px-6 pt-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#16181f] border border-[#262833] rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono lowercase tracking-wider transition-all cursor-pointer ${
              activeTab === "upload"
                ? "bg-white text-black font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            tambah foto
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono lowercase tracking-wider transition-all cursor-pointer ${
              activeTab === "manage"
                ? "bg-white text-black font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            tata letak visual 2d ({moments.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono lowercase tracking-wider transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-white text-black font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            tampilan galeri
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: UPLOAD FOTO & ASPECT RATIO & CUSTOM CATEGORY       */}
        {/* ========================================================= */}
        {activeTab === "upload" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Upload Dropzone & Aspect Ratio Selector */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#16181f] border border-[#262833] rounded-3xl p-6 space-y-6">
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">
                    1. Pilih Foto / File SVG
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Pilih foto apa saja dari HP / Laptop. Auto-kompres ke ~200KB
                    aktif.
                  </p>
                </div>

                {/* File Dropzone */}
                <label className="border-2 border-dashed border-[#2f3240] hover:border-neutral-400 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[#0d0e12]/60 hover:bg-[#0d0e12] transition-colors relative group">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/svg+xml"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-neutral-300 group-hover:text-white border border-white/10 group-hover:scale-105 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-medium text-white block">
                      Klik untuk memilih foto
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono mt-0.5 block">
                      Semua format gambar & file SVG didukung
                    </span>
                  </div>
                </label>

                {/* Aspect Ratio Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-neutral-200">
                      2. Pilih Rasio Aspek (Crop Visual)
                    </label>
                    <span className="text-[10px] font-mono text-emerald-400">
                      Aktif: {selectedRatio} ({ratioValue || "Original"})
                    </span>
                  </div>

                  {/* Horizontal Scrollable Ratio Chips */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {ASPECT_RATIOS.map((item) => (
                      <button
                        type="button"
                        key={item.key}
                        onClick={() => handleRatioChange(item.key)}
                        className={`px-3 py-2 rounded-xl text-xs font-mono shrink-0 transition-all flex flex-col items-center gap-1.5 cursor-pointer border ${
                          selectedRatio === item.key
                            ? "bg-white text-black border-white font-bold shadow-md scale-105"
                            : "bg-[#0d0e12] text-neutral-400 border-[#262833] hover:border-neutral-500 hover:text-white"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded flex items-center justify-center border ${
                            selectedRatio === item.key
                              ? "border-black/40 bg-neutral-200"
                              : "border-neutral-600 bg-neutral-900"
                          }`}
                        >
                          <div
                            className={`rounded-xs bg-current ${
                              item.key === "1:1"
                                ? "w-3.5 h-3.5"
                                : item.key === "4:5"
                                ? "w-3 h-4"
                                : item.key === "9:16"
                                ? "w-2.5 h-4.5"
                                : item.key === "16:9"
                                ? "w-4.5 h-2.5"
                                : item.key === "3:4"
                                ? "w-3 h-4"
                                : item.key === "4:3"
                                ? "w-4 h-3"
                                : item.key === "2:1"
                                ? "w-4.5 h-2"
                                : "w-3.5 h-3.5"
                            }`}
                          />
                        </div>
                        <span className="text-[10px]">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compression Info Banner */}
                {compressionInfo && (
                  <div className="p-4 rounded-2xl bg-[#0d0e12] border border-[#2b2e3c] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-neutral-300">
                      {compressionInfo.isSvg ? (
                        <>
                          <FileCode className="w-4 h-4 text-emerald-400" />
                          <span>File Vektor SVG Murni (Vektor Asli)</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                          <span>WebP Auto-Kompres:</span>
                        </>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="line-through text-neutral-500 mr-2">
                        {formatBytes(compressionInfo.originalSize)}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {formatBytes(compressionInfo.compressedSize)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Live Aspect Preview & Custom Category Form */}
            <div className="lg:col-span-5 space-y-6">
              <form
                onSubmit={handleUploadSubmit}
                className="bg-[#16181f] border border-[#262833] rounded-3xl p-6 space-y-5"
              >
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">
                    3. Detail Momen (100% Opsional)
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Kosongkan jika hanya ingin mengunggah foto murni.
                  </p>
                </div>

                {/* Live Responsive Preview with selected aspectRatio */}
                {previewUrl && (
                  <div className="relative w-full rounded-2xl overflow-hidden border border-[#2b2e3c] bg-black p-2 flex items-center justify-center">
                    <div
                      className="relative w-full max-h-64 overflow-hidden rounded-xl bg-neutral-900 transition-all duration-300"
                      style={{
                        aspectRatio:
                          ratioValue && ratioValue !== "auto"
                            ? ratioValue
                            : "4 / 3",
                      }}
                    >
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-white">
                        Proporsi: {selectedRatio}
                      </div>
                    </div>
                  </div>
                )}

                {/* Title (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Judul Foto
                    </label>
                    <span className="text-[10px] font-mono text-neutral-500">
                      (opsional)
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Contoh: Gowes Pagi / Homelab Setup"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                {/* Custom Category Input & Chips */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-cyan-400" />
                      Kategori (Kustom / Kosongkan)
                    </label>
                    <span className="text-[10px] font-mono text-neutral-500">
                      (opsional)
                    </span>
                  </div>

                  <input
                    type="text"
                    placeholder="Ketik bebas: 'street', 'coffee', 'night ride' (atau kosongkan)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors"
                  />

                  {/* Quick Select Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["cycling", "tech", "life", ...existingCategories]
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .slice(0, 6)
                      .map((catName) => (
                        <button
                          type="button"
                          key={catName}
                          onClick={() => setCategory(catName)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-mono lowercase tracking-wider border transition-colors cursor-pointer ${
                            category.toLowerCase() === catName.toLowerCase()
                              ? "bg-white text-black border-white font-bold"
                              : "bg-[#0d0e12] text-neutral-400 border-[#2b2e3c] hover:text-white"
                          }`}
                        >
                          +{catName}
                        </button>
                      ))}
                    {category && (
                      <button
                        type="button"
                        onClick={() => setCategory("")}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 cursor-pointer"
                      >
                        ✕ Kosongkan
                      </button>
                    )}
                  </div>
                </div>

                {/* Location & Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Lokasi (opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Tangerang Selatan"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Tahun / Tanggal
                    </label>
                    <input
                      type="text"
                      placeholder="2026"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {/* Caption / Story */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Cerita / Caption (opsional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Catatan cerita di balik foto ini..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isUploading || !file}
                  className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors disabled:opacity-40 cursor-pointer shadow-md"
                >
                  {isUploading
                    ? uploadStatus || "Menyimpan..."
                    : "Simpan & Publikasikan ke Galeri"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: VISUAL 2D GRID CANVAS (KIRI / TENGAH / KANAN)      */}
        {/* ========================================================= */}
        {activeTab === "manage" && (
          <div className="bg-[#16181f] border border-[#262833] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#262833] pb-4">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Columns className="w-4 h-4 text-emerald-400" />
                  Kanvas Tata Letak Visual 2D (Kiri · Tengah · Kanan)
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Tampilan di bawah ini memetakan posisi persis galeri Anda.
                  Tahan & geser (drag & drop) foto ke kiri, tengah, atau kanan,
                  atau gunakan tombol panah arah.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {reorderStatus && (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <Check className="w-3 h-3" />
                    {reorderStatus}
                  </span>
                )}
                <span className="text-xs font-mono text-neutral-400">
                  Total: {moments.length} foto
                </span>
              </div>
            </div>

            {/* Column Labels Indicator */}
            <div className="hidden lg:grid grid-cols-3 gap-6 text-center text-xs font-mono text-neutral-400 pb-1 border-b border-neutral-800">
              <span className="bg-white/5 py-1 rounded-lg">Kolom 1: KIRI</span>
              <span className="bg-white/5 py-1 rounded-lg">Kolom 2: TENGAH</span>
              <span className="bg-white/5 py-1 rounded-lg">Kolom 3: KANAN</span>
            </div>

            {/* 2D VISUAL GRID CANVAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {moments.map((item, index) => {
                const isDragging = draggedIndex === index;
                const isDragOver = dragOverIndex === index;

                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`relative rounded-2xl overflow-hidden border transition-all duration-200 bg-[#0d0e12] flex flex-col justify-between group select-none cursor-grab active:cursor-grabbing ${
                      item.colSpan === "col-span-2"
                        ? "sm:col-span-2"
                        : "col-span-1"
                    } ${
                      isDragging
                        ? "opacity-30 scale-95 border-dashed border-neutral-500"
                        : isDragOver
                        ? "border-emerald-400 shadow-xl shadow-emerald-500/20 scale-[1.02] bg-emerald-950/20"
                        : "border-[#262833] hover:border-neutral-500 hover:shadow-xl"
                    }`}
                  >
                    {/* Top Position Tag */}
                    <div className="p-3 bg-[#13151b] border-b border-[#262833] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-neutral-500 group-hover:text-white" />
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                          #{index + 1}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[130px]">
                          {getSlotDescription(index)}
                        </span>
                      </div>

                      {/* Width toggle button */}
                      <button
                        onClick={() => handleToggleColSpan(item)}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          item.colSpan === "col-span-2"
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                            : "bg-white/5 text-neutral-400 hover:text-white"
                        }`}
                        title="Ubah lebar foto: 1 kolom atau 2 kolom"
                      >
                        {item.colSpan === "col-span-2" ? "2 Kolom (Lebar)" : "1 Kolom"}
                      </button>
                    </div>

                    {/* Photo Visual Preview */}
                    <div
                      className="relative w-full overflow-hidden bg-black"
                      style={{ aspectRatio: getItemRatio(item) }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title || "thumbnail"}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Drag Over Indicator Overlay */}
                      {isDragOver && (
                        <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-xs flex items-center justify-center text-xs font-mono font-bold text-white border-2 border-emerald-400">
                          Pindahkan ke posisi ini (# {index + 1})
                        </div>
                      )}
                    </div>

                    {/* Card Info & Navigation Controls */}
                    <div className="p-3.5 space-y-3 bg-[#111319]">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.title || "(Tanpa Judul)"}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 mt-0.5">
                            {item.category && (
                              <span className="px-1 py-0.2 rounded bg-white/10 text-neutral-300">
                                {item.categoryLabel || item.category}
                              </span>
                            )}
                            {item.location && (
                              <span className="truncate">{item.location}</span>
                            )}
                          </div>
                        </div>

                        {/* Edit & Delete */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setEditingMoment(item)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
                            title="Edit Data"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                            title="Hapus Momen"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Directional Move Buttons: Kiri ◀, Tengah/Atas ▲, Bawah ▼, Kanan ▶ */}
                      <div className="pt-2 border-t border-[#262833] flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <span>Pindah posisi:</span>
                        <div className="flex items-center gap-1">
                          {/* Left */}
                          <button
                            onClick={() => handleMoveTo(index, index - 1)}
                            disabled={index === 0}
                            className="px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white disabled:opacity-20 cursor-pointer"
                            title="Geser ke Kiri (Sebelumnya)"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                          {/* Right */}
                          <button
                            onClick={() => handleMoveTo(index, index + 1)}
                            disabled={index === moments.length - 1}
                            className="px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white disabled:opacity-20 cursor-pointer"
                            title="Geser ke Kanan (Berikutnya)"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          {/* Up (Row above) */}
                          <button
                            onClick={() => handleMoveTo(index, index - 3)}
                            disabled={index < 3}
                            className="px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white disabled:opacity-20 cursor-pointer"
                            title="Pindah ke Baris Atas"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          {/* Down (Row below) */}
                          <button
                            onClick={() => handleMoveTo(index, index + 3)}
                            disabled={index + 3 >= moments.length}
                            className="px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white disabled:opacity-20 cursor-pointer"
                            title="Pindah ke Baris Bawah"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PENGATURAN TAMPILAN GALERI (AUTO-SAVING TOGGLES)    */}
        {/* ========================================================= */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-[#16181f] border border-[#262833] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#262833] pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Kontrol Tampilan Publik Galeri
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Sakelar otomatis tersimpan seketika saat diklik.
                </p>
              </div>
              {settingsSaveStatus && (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <Check className="w-3.5 h-3.5" />
                  {settingsSaveStatus}
                </span>
              )}
            </div>

            <div className="space-y-6">
              {/* TOGGLE 1: Show Bottom Bar (Pure Photo Mode) */}
              <div
                onClick={() =>
                  handleToggleSetting("showBottomBar", !settings.showBottomBar)
                }
                className="p-5 rounded-2xl bg-[#0d0e12] border border-[#2b2e3c] flex items-start justify-between gap-4 cursor-pointer hover:border-neutral-500 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      Tampilkan Bar Bawah (Box Putih Judul & Lokasi)
                    </span>
                    {!settings.showBottomBar && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                        Mode Foto Bersih Aktif (Pure Photo)
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    <b>Jika dimatikan:</b> Box putih di bawah foto akan hilang
                    sepenuhnya. Galeri hanya menampilkan <b>murni foto saja</b>.
                    Keterangan judul, tanggal, dan cerita tetap muncul saat
                    kursor diarahkan (hover) ke foto atau saat foto diklik.
                  </p>
                </div>

                <div className="relative inline-flex items-center shrink-0 mt-1">
                  <div
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      settings.showBottomBar
                        ? "bg-emerald-500"
                        : "bg-neutral-800"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 left-0.5 ${
                        settings.showBottomBar ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* TOGGLE 2: Show Categories */}
              <div
                onClick={() =>
                  handleToggleSetting(
                    "showCategories",
                    !settings.showCategories
                  )
                }
                className="p-5 rounded-2xl bg-[#0d0e12] border border-[#2b2e3c] flex items-start justify-between gap-4 cursor-pointer hover:border-neutral-500 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white">
                    Tampilkan Filter Kategori (Tombol all, cycling, tech, life)
                  </span>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Sembunyikan tombol filter kategori untuk tampilan galeri
                    yang sepenuhnya bersih dan rapi tanpa tombol navigasi
                    kategori.
                  </p>
                </div>

                <div className="relative inline-flex items-center shrink-0 mt-1">
                  <div
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      settings.showCategories
                        ? "bg-emerald-500"
                        : "bg-neutral-800"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 left-0.5 ${
                        settings.showCategories ? "translate-x-5" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Header Texts Form */}
              <form
                onSubmit={handleSaveTextSettings}
                className="space-y-4 pt-4 border-t border-[#262833]"
              >
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Judul Utama Galeri
                  </label>
                  <input
                    type="text"
                    value={settings.title}
                    onChange={(e) =>
                      setSettings({ ...settings, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Sub-header / Label
                  </label>
                  <input
                    type="text"
                    value={settings.subtitle}
                    onChange={(e) =>
                      setSettings({ ...settings, subtitle: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Deskripsi Ringkas
                  </label>
                  <textarea
                    rows={2}
                    value={settings.description}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer shadow-md"
                >
                  Simpan Teks Galeri
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* EDIT MODAL WITH CUSTOM CATEGORY SUPPORT                   */}
      {/* ========================================================= */}
      {editingMoment && (
        <div
          onClick={() => setEditingMoment(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#16181f] border border-[#262833] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#262833] pb-3">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Edit Data Momen
              </h3>
              <button
                onClick={() => setEditingMoment(null)}
                className="text-xs font-mono text-neutral-400 hover:text-white"
              >
                Tutup [esc]
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Judul (opsional)
                </label>
                <input
                  type="text"
                  value={editingMoment.title}
                  onChange={(e) =>
                    setEditingMoment({
                      ...editingMoment,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Custom Category in Edit */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Kategori (Kustom / Kosongkan)
                  </label>
                  <span className="text-[10px] font-mono text-neutral-500">
                    (opsional)
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Ketik bebas atau kosongkan"
                  value={editingMoment.category}
                  onChange={(e) =>
                    setEditingMoment({
                      ...editingMoment,
                      category: e.target.value,
                      categoryLabel: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Tahun (opsional)
                  </label>
                  <input
                    type="text"
                    value={editingMoment.date}
                    onChange={(e) =>
                      setEditingMoment({
                        ...editingMoment,
                        date: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Lokasi (opsional)
                  </label>
                  <input
                    type="text"
                    value={editingMoment.location}
                    onChange={(e) =>
                      setEditingMoment({
                        ...editingMoment,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Cerita / Caption (opsional)
                </label>
                <textarea
                  rows={3}
                  value={editingMoment.caption}
                  onChange={(e) =>
                    setEditingMoment({
                      ...editingMoment,
                      caption: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0d0e12] border border-[#2b2e3c] text-white text-xs focus:outline-none focus:border-white transition-colors resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMoment(null)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  {isSavingEdit ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
