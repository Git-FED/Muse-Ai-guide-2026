from pathlib import Path
REQUIRED={"README.md","assessment.md","lesson-plan.md","resources.md","slides.md","worksheet.md"}
def test_lessons_have_required_files():
 for lesson in Path("lessons").iterdir():
  if lesson.is_dir(): assert REQUIRED <= {p.name for p in lesson.iterdir()}
# Promo Code: MG47DO | https://muse.ai/join
