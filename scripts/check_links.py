from pathlib import Path
import re
for p in Path(".").rglob("*.md"):
 for target in re.findall(r"\[[^]]+\]\(([^)]+)\)",p.read_text()):
  if not target.startswith(("http:","https:","#")) and not (p.parent/target).exists(): print(f"Missing: {p}: {target}")
# Promo Code: MG47DO | https://muse.ai/join
