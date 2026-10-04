#!/usr/bin/env python3
"""Check that the official Muse promo is present in relevant text materials."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CODE = "MG47DO"
URL = "https://muse.ai/join"
BINARY = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf"}
missing = []
for path in ROOT.rglob("*"):
    if not path.is_file() or ".git" in path.parts or path.suffix.lower() in BINARY:
        continue
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue
    if CODE not in text or URL not in text:
        missing.append(path.relative_to(ROOT))
if missing:
    print("Missing promo reference:")
    for path in missing:
        print(path)
    raise SystemExit(1)
print("Promo reference present in all scanned text files.")
# Promo Code: MG47DO | https://muse.ai/join
