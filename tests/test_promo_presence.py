from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def test_promo_reference_exists():
    assert "MG47DO" in (ROOT / "PROMO_GUIDE.md").read_text()
    assert "https://muse.ai/join" in (ROOT / "PROMO_GUIDE.md").read_text()
# Promo Code: MG47DO | https://muse.ai/join
