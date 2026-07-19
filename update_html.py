import os

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace all occurrences of image files with their webp counterparts
content = content.replace('src="hero.png"', 'src="hero.webp" fetchpriority="high"')
content = content.replace('src="logo.png"', 'src="logo.webp" loading="lazy"')
content = content.replace('src="profile.jpg"', 'src="profile.webp" loading="lazy"')

# Wait, the first logo in the navbar is at the top of the page, so it doesn't need lazy loading
# Let's fix that. The footer logo can be lazy loaded.
# Let's just do a blanket replace and then fix the navbar logo
content = content.replace('src="logo.webp" loading="lazy" alt="Logo" style="height: 44px', 'src="logo.webp" alt="Logo" style="height: 44px')

# Profile image in the hero section is above the fold, so no lazy loading for it.
content = content.replace('src="profile.webp" loading="lazy" alt="Unnikrishnan V C" class="name-avatar"', 'src="profile.webp" alt="Unnikrishnan V C" class="name-avatar"')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated index.html")
