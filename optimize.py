from PIL import Image
import os

images = {
    'hero.png': ('hero.webp', 1920),
    'grove.png': ('grove.webp', 800),
    'logo.png': ('logo.webp', 400),
    'profile.jpg': ('profile.webp', 400)
}

for src, (dst, max_width) in images.items():
    if os.path.exists(src):
        img = Image.open(src)
        
        # Calculate new height keeping aspect ratio
        ratio = max_width / float(img.width)
        if ratio < 1:
            new_height = int((float(img.height) * float(ratio)))
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        
        img.save(dst, 'WEBP', quality=80)
        print(f"Converted {src} to {dst}")
