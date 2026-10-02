#!/usr/bin/env bash
set -euo pipefail

APP_PATH="${1:?Usage: verify-notarization.sh /path/to/App.app}"
codesign --verify --deep --strict --verbose=2 "$APP_PATH"
spctl --assess --type execute --verbose=4 "$APP_PATH"
