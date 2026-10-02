#!/usr/bin/env bash
set -euo pipefail

APP_PATH="${1:?Usage: notarize.sh /path/to/App.app}"
: "${APPLE_ID:?Set APPLE_ID in the protected CI environment}"
: "${APPLE_PASSWORD:?Set APPLE_PASSWORD in the protected CI environment}"
: "${APPLE_TEAM_ID:?Set APPLE_TEAM_ID in the protected CI environment}"

xcrun notarytool submit "$APP_PATH" \
  --apple-id "$APPLE_ID" \
  --password "$APPLE_PASSWORD" \
  --team-id "$APPLE_TEAM_ID" \
  --wait
xcrun stapler staple "$APP_PATH"
