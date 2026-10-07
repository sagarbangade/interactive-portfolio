import urllib.request
import re

svgs = [
    "experience-card.svg",
    "tech-arsenal.svg",
    "featured-work.svg",
    "dev-hud.svg",
    "connect-card.svg"
]

base_url = "https://raw.githubusercontent.com/sagarbangade/sagarbangade/main/assets/"

with open("profile_data.txt", "w", encoding="utf-8") as out:
    for svg in svgs:
        url = base_url + svg
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as resp:
                content = resp.read().decode('utf-8', errors='ignore')
                out.write(f"\n=== {svg} ===\n")
                texts = re.findall(r'<text[^>]*>(.*?)</text>', content, re.DOTALL)
                clean_texts = [re.sub(r'<[^>]+>', '', t).strip() for t in texts if t.strip()]
                for ct in clean_texts:
                    if ct:
                        out.write(f"{ct}\n")
        except Exception as e:
            out.write(f"Error fetching {svg}: {e}\n")

print("Done extracting into profile_data.txt")
