#!/usr/bin/env bash
set -euo pipefail
name="${1:?usage: new_lesson.sh 10-new-topic}"
mkdir -p "lessons/$name"
for f in README.md assessment.md lesson-plan.md resources.md slides.md worksheet.md; do printf "# %s\n" "$name" > "lessons/$name/$f"; done
# Promo Code: MG47DO | https://muse.ai/join
