import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def process():
    # 1. Load the transparent cutout
    img_rgba = Image.open('public/selfie-transparent.png')
    w, h = img_rgba.size
    print(f"Original transparent size: {w}x{h}")

    # Center crop around head and torso
    # Head center is approximately x=540, y=280
    cx, cy = 540, 310
    crop_size = 600
    x1 = max(0, cx - crop_size // 2)
    y1 = max(0, cy - crop_size // 2)
    x2 = min(w, x1 + crop_size)
    y2 = min(h, y1 + crop_size)

    cropped_rgba = img_rgba.crop((x1, y1, x2, y2))

    # Resize to crisp 1200x1200
    target_size = (1200, 1200)
    cropped_rgba = cropped_rgba.resize(target_size, Image.Resampling.LANCZOS)
    mask = cropped_rgba.split()[3]

    # --- VERSION 1: REAL PHOTO ON PURE WHITE BACKGROUND ---
    real_white = Image.new('RGBA', target_size, (255, 255, 255, 255))
    real_white.paste(cropped_rgba, (0, 0), mask)
    real_white.convert('RGB').save('public/selfie-hero-real.jpg', quality=95)
    print("Saved public/selfie-hero-real.jpg")

    # --- VERSION 2: ARTISTIC / ILLUSTRATED VERSION (ADHAM DANNAWAY STYLE) ---
    np_img = np.array(real_white.convert('RGB'))

    # Smooth bilateral color shading
    smooth = cv2.bilateralFilter(np_img, d=9, sigmaColor=75, sigmaSpace=75)
    smooth = cv2.bilateralFilter(smooth, d=7, sigmaColor=55, sigmaSpace=55)

    # Clean comic ink edges
    gray = cv2.cvtColor(np_img, cv2.COLOR_RGB2GRAY)
    gray_blur = cv2.medianBlur(gray, 7)
    edges = cv2.adaptiveThreshold(gray_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 9, 3)
    edges_rgb = cv2.cvtColor(edges, cv2.COLOR_GRAY2RGB)

    # Quantize colors
    quant = (smooth // 28) * 28 + 14
    cartoon = cv2.bitwise_and(quant, edges_rgb)
    art_pil = Image.fromarray(cartoon).convert('RGBA')

    # Colorful painterly brush strokes on the face (Adham Dannaway paint style)
    brush_layer = Image.new('RGBA', target_size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(brush_layer)

    # Palette: Cyan (#06b6d4), Crimson (#ef4444), Amber (#f59e0b), Blue (#3b82f6)
    # Forehead brush strokes
    draw.polygon([(340, 160), (480, 120), (520, 180), (370, 220)], fill=(6, 182, 212, 140))
    draw.polygon([(420, 140), (550, 110), (580, 160), (440, 200)], fill=(239, 68, 68, 130))
    draw.polygon([(320, 200), (440, 180), (470, 240), (340, 270)], fill=(245, 158, 11, 150))

    # Cheek & nose brush strokes
    draw.polygon([(310, 290), (420, 260), (440, 340), (330, 370)], fill=(239, 68, 68, 130))
    draw.polygon([(350, 360), (480, 330), (500, 420), (370, 450)], fill=(59, 130, 246, 120))
    draw.polygon([(460, 280), (530, 250), (550, 330), (480, 360)], fill=(245, 158, 11, 130))

    # Neck & clothes brush strokes
    draw.polygon([(370, 490), (500, 460), (520, 560), (390, 590)], fill=(6, 182, 212, 120))
    draw.polygon([(260, 600), (420, 550), (440, 650), (280, 700)], fill=(239, 68, 68, 110))
    draw.polygon([(440, 580), (600, 520), (630, 630), (460, 690)], fill=(245, 158, 11, 120))

    # Soft paint blur for natural watercolor effect
    brush_layer = brush_layer.filter(ImageFilter.GaussianBlur(10))

    # Composite brush strokes onto the cartoon figure
    art_character = Image.alpha_composite(art_pil, brush_layer)

    # Background code text (Adham Dannaway Coder side)
    final_art = Image.new('RGBA', target_size, (255, 255, 255, 255))
    code_layer = Image.new('RGBA', target_size, (0, 0, 0, 0))
    code_draw = ImageDraw.Draw(code_layer)

    code_lines = [
        "<html>",
        "height: 226px;",
        'class="jedi">',
        "CSS3  HTML5",
        "color: #000;",
        "jQuery  Next.js",
        "Proxmox VE  8.2",
        "coolify.io  200_OK"
    ]

    y_pos = 280
    for line in code_lines:
        code_draw.text((740, y_pos), line, fill=(185, 185, 190, 160))
        y_pos += 48

    final_art.paste(code_layer, (0, 0), code_layer)
    final_art.paste(art_character, (0, 0), mask)

    final_art.convert('RGB').save('public/selfie-hero-art.jpg', quality=95)
    print("Saved public/selfie-hero-art.jpg")

    # Also make a 50-50 blend to verify alignment
    blend = Image.blend(real_white.convert('RGB'), final_art.convert('RGB'), 0.5)
    blend.save('public/selfie-test-blend.jpg')
    print("Saved public/selfie-test-blend.jpg")

if __name__ == "__main__":
    process()
