export interface AspectRatioOption {
  key: string;
  label: string;
  ratio: number | null; // width / height, null for original
  aspectClass: string;
  ratioValue: string;
}

export const ASPECT_RATIOS: AspectRatioOption[] = [
  { key: "original", label: "Original", ratio: null, aspectClass: "aspect-auto", ratioValue: "" },
  { key: "1:1", label: "Square (1:1)", ratio: 1, aspectClass: "aspect-square", ratioValue: "1 / 1" },
  { key: "4:5", label: "4:5", ratio: 4 / 5, aspectClass: "aspect-[4/5]", ratioValue: "4 / 5" },
  { key: "5:4", label: "5:4", ratio: 5 / 4, aspectClass: "aspect-[5/4]", ratioValue: "5 / 4" },
  { key: "3:4", label: "3:4", ratio: 3 / 4, aspectClass: "aspect-[3/4]", ratioValue: "3 / 4" },
  { key: "4:3", label: "4:3", ratio: 4 / 3, aspectClass: "aspect-[4/3]", ratioValue: "4 / 3" },
  { key: "9:16", label: "9:16", ratio: 9 / 16, aspectClass: "aspect-[9/16]", ratioValue: "9 / 16" },
  { key: "16:9", label: "16:9", ratio: 16 / 9, aspectClass: "aspect-[16/9]", ratioValue: "16 / 9" },
  { key: "2:3", label: "2:3", ratio: 2 / 3, aspectClass: "aspect-[2/3]", ratioValue: "2 / 3" },
  { key: "3:2", label: "3:2", ratio: 3 / 2, aspectClass: "aspect-[3/2]", ratioValue: "3 / 2" },
  { key: "5:7", label: "5:7", ratio: 5 / 7, aspectClass: "aspect-[5/7]", ratioValue: "5 / 7" },
  { key: "7:5", label: "7:5", ratio: 7 / 5, aspectClass: "aspect-[7/5]", ratioValue: "7 / 5" },
  { key: "1:2", label: "1:2", ratio: 1 / 2, aspectClass: "aspect-[1/2]", ratioValue: "1 / 2" },
  { key: "2:1", label: "2:1", ratio: 2 / 1, aspectClass: "aspect-[2/1]", ratioValue: "2 / 1" },
];

/**
 * Compresses an image file (JPEG, PNG, WebP) to WebP (~200KB) with high visual fidelity.
 * If file is SVG, returns SVG as-is without rasterizing.
 */
export async function processAndCompressImage(
  file: File,
  targetRatioKey?: string
): Promise<{
  blob: Blob;
  mimeType: string;
  originalSize: number;
  compressedSize: number;
  aspectClass: string;
  ratioValue: string;
}> {
  const originalSize = file.size;

  // Handle SVG directly
  if (file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")) {
    return {
      blob: file,
      mimeType: "image/svg+xml",
      originalSize,
      compressedSize: originalSize,
      aspectClass: "aspect-auto",
      ratioValue: "auto",
    };
  }

  const selectedRatio = ASPECT_RATIOS.find((r) => r.key === targetRatioKey) || ASPECT_RATIOS[0];

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas context could not be initialized"));
          return;
        }

        let srcX = 0;
        let srcY = 0;
        let srcWidth = img.width;
        let srcHeight = img.height;

        // Apply Aspect Ratio Crop if specified (not original)
        if (selectedRatio.ratio !== null) {
          const targetRatio = selectedRatio.ratio;
          const currentRatio = img.width / img.height;

          if (currentRatio > targetRatio) {
            // Image is wider than target ratio: crop width centered
            srcWidth = Math.round(img.height * targetRatio);
            srcX = Math.round((img.width - srcWidth) / 2);
          } else {
            // Image is taller than target ratio: crop height centered
            srcHeight = Math.round(img.width / targetRatio);
            srcY = Math.round((img.height - srcHeight) / 2);
          }
        }

        // Limit maximum dimensions for optimal performance (~1600px max)
        const MAX_DIMENSION = 1600;
        let destWidth = srcWidth;
        let destHeight = srcHeight;

        if (destWidth > MAX_DIMENSION || destHeight > MAX_DIMENSION) {
          if (destWidth > destHeight) {
            destHeight = Math.round((destHeight * MAX_DIMENSION) / destWidth);
            destWidth = MAX_DIMENSION;
          } else {
            destWidth = Math.round((destWidth * MAX_DIMENSION) / destHeight);
            destHeight = MAX_DIMENSION;
          }
        }

        canvas.width = destWidth;
        canvas.height = destHeight;

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, destWidth, destHeight);

        // Export as WebP with 0.82 quality (~150-250KB)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Image compression failed"));
              return;
            }

            // Determine aspectClass
            let aspectClass = selectedRatio.aspectClass;
            let ratioValue = selectedRatio.ratioValue;
            if (selectedRatio.key === "original") {
              ratioValue = `${destWidth} / ${destHeight}`;
              const detectedRatio = destWidth / destHeight;
              if (Math.abs(detectedRatio - 1) < 0.05) aspectClass = "aspect-square";
              else if (Math.abs(detectedRatio - 4 / 3) < 0.05) aspectClass = "aspect-[4/3]";
              else if (Math.abs(detectedRatio - 3 / 4) < 0.05) aspectClass = "aspect-[3/4]";
              else if (Math.abs(detectedRatio - 16 / 9) < 0.05) aspectClass = "aspect-[16/9]";
              else if (Math.abs(detectedRatio - 4 / 5) < 0.05) aspectClass = "aspect-[4/5]";
              else aspectClass = detectedRatio > 1 ? "aspect-[4/3]" : "aspect-[3/4]";
            }

            resolve({
              blob,
              mimeType: "image/webp",
              originalSize,
              compressedSize: blob.size,
              aspectClass,
              ratioValue: ratioValue || "4/3",
            });
          },
          "image/webp",
          0.82
        );
      };

      img.onerror = () => reject(new Error("Failed to load image file"));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}
