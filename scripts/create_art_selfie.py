import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def create_art():
    stylized = Image.open('public/test-stylized.jpg').convert('RGBA')
    w, h = stylized.size

    # 1. Add painterly brush strokes across the face/head/torso
    brush = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(brush)

    # Hair & Forehead strokes
    draw.polygon([(360, 160), (510, 120), (540, 190), (390, 230)], fill=(2, 132, 199, 150)) # Teal
    draw.polygon([(430, 140), (570, 100), (600, 170), (460, 210)], fill=(225, 29, 72, 140))  # Crimson
    draw.polygon([(320, 210), (450, 170), (480, 250), (350, 280)], fill=(217, 119, 6, 160))  # Amber

    # Cheeks, nose, temple strokes
    draw.polygon([(300, 290), (420, 260), (450, 350), (330, 380)], fill=(225, 29, 72, 140))  # Crimson
    draw.polygon([(360, 360), (490, 330), (510, 420), (380, 450)], fill=(37, 99, 235, 130))  # Blue
    draw.polygon([(450, 280), (540, 240), (560, 330), (470, 370)], fill=(234, 179, 8, 150))  # Gold

    # Neck & chest strokes
    draw.polygon([(360, 490), (500, 450), (530, 560), (390, 600)], fill=(2, 132, 199, 130)) # Teal
    draw.polygon([(240, 620), (430, 570), (450, 680), (260, 730)], fill=(225, 29, 72, 120))  # Crimson
    draw.polygon([(440, 600), (620, 530), (650, 660), (470, 720)], fill=(217, 119, 6, 130))  # Amber
    draw.polygon([(150, 670), (320, 630), (340, 740), (170, 780)], fill=(37, 99, 235, 110))  # Blue

    # Soft paint blur for watercolor feel
    brush = brush.filter(ImageFilter.GaussianBlur(8))

    # Composite brush over stylized figure
    art_painted = Image.alpha_composite(stylized, brush)

    # 2. Add Code typography on the right side background (Adham Dannaway style)
    code_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
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
        code_draw.text((750, y_pos), line, fill=(185, 185, 192, 160))
        y_pos += 48

    # 3. Create final canvas on pure white
    final_art = Image.new('RGBA', (w, h), (255, 255, 255, 255))
    final_art.paste(code_layer, (0, 0), code_layer)

    # Paste art character using cutout mask
    trans = Image.open('public/selfie-transparent.png')
    cx, cy = 540, 310
    crop_size = 600
    x1 = max(0, cx - crop_size // 2)
    y1 = max(0, cy - crop_size // 2)
    x2 = min(trans.size[0], x1 + crop_size)
    y2 = min(trans.size[1], y1 + crop_size)
    mask = trans.crop((x1, y1, x2, y2)).resize((w, h), Image.Resampling.LANCZOS).split()[3]

    final_art.paste(art_painted, (0, 0), mask)
    final_art.convert('RGB').save('public/selfie-hero-art.jpg', quality=95)
    print("Saved public/selfie-hero-art.jpg successfully!")

if __name__ == "__main__":
    create_art()
