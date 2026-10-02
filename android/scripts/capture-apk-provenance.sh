#!/usr/bin/env bash
set -euo pipefail
APK="${1:-app/build/outputs/apk/debug/app-debug.apk}"
OUT="${2:-build/outputs/apk/debug/apk-provenance.json}"
mkdir -p "$(dirname "$OUT")"
if [[ ! -f "$APK" ]]; then echo "APK not found: $APK" >&2; exit 1; fi
SHA256=$(sha256sum "$APK" | awk '{print $1}')
COMMIT=$(git rev-parse HEAD 2>/dev/null || printf 'unavailable')
VERSION=$(grep -E 'versionName' app/build.gradle | sed -E "s/.*versionName[[:space:]]*['\"]([^'\"]+).*/\1/" | head -1)
python3 - "$OUT" "$SHA256" "$COMMIT" "$VERSION" "$APK" <<'PY'
import json, sys
out, sha, commit, version, apk = sys.argv[1:]
with open(out, 'w', encoding='utf-8') as handle:
    json.dump({'artifact': apk, 'sha256': sha, 'source_commit': commit, 'version_name': version, 'build_type': 'debug', 'note': 'Checksum and source commit are evidence of this build invocation, not a release-signing attestation.'}, handle, indent=2)
    handle.write('\n')
PY
printf '%s  %s\n' "$SHA256" "$APK" > "$(dirname "$OUT")/SHA256SUMS.txt"
cat "$OUT"
