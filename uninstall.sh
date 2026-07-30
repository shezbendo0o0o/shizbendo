#!/usr/bin/env bash
set -euo pipefail

[[ "$EUID" -eq 0 ]] || {
    echo "Run with sudo:"
    echo "  sudo ./uninstall.sh"
    exit 1
}

rm -f \
    /usr/local/bin/shizbendo \
    /usr/local/bin/shizbendo-pty \
    /usr/local/bin/mscript-shizbendo-branding \
    /usr/local/bin/mscript-decepticon

rm -rf \
    /root/.decepticon/shizbendo-branding

echo "[+] Shizbendo customization removed."
echo "[+] Engagements and upstream data were preserved."
