#!/usr/bin/env bash
set -euo pipefail

[[ "$EUID" -eq 0 ]] || {
    echo "Run with sudo:"
    echo "  sudo ./install.sh"
    exit 1
}

PROJECT_DIR="$(
    cd "$(dirname "${BASH_SOURCE[0]}")" &&
    pwd
)"

BRANDING_DIR="/root/.decepticon/shizbendo-branding"

[[ -x /root/.local/bin/decepticon ]] ||
command -v decepticon >/dev/null 2>&1 || {
    echo "[-] The official Decepticon runtime is not installed."
    echo "[-] Install it before installing Shizbendo."
    exit 1
}

command -v docker >/dev/null || {
    echo "[-] Docker is required."
    exit 1
}

mkdir -p "$BRANDING_DIR"

install -m 0755 \
    "$PROJECT_DIR/bin/mscript-decepticon" \
    /usr/local/bin/mscript-decepticon

install -m 0755 \
    "$PROJECT_DIR/bin/mscript-shizbendo-branding" \
    /usr/local/bin/mscript-shizbendo-branding

install -m 0755 \
    "$PROJECT_DIR/bin/shizbendo-pty" \
    /usr/local/bin/shizbendo-pty

install -m 0755 \
    "$PROJECT_DIR/bin/shizbendo" \
    /usr/local/bin/shizbendo

install -m 0644 \
    "$PROJECT_DIR/branding/Banner.js" \
    "$BRANDING_DIR/Banner.js"

install -m 0644 \
    "$PROJECT_DIR/branding/Dockerfile" \
    "$BRANDING_DIR/Dockerfile"

install -m 0644 \
    "$PROJECT_DIR/branding/patch-index.mjs" \
    "$BRANDING_DIR/patch-index.mjs"

if [[ -f "$PROJECT_DIR/branding/shizbendo-entrypoint.mjs" ]]
then
    install -m 0644 \
        "$PROJECT_DIR/branding/shizbendo-entrypoint.mjs" \
        "$BRANDING_DIR/shizbendo-entrypoint.mjs"
fi

python3 -m py_compile \
    /usr/local/bin/shizbendo-pty

bash -n \
    /usr/local/bin/mscript-decepticon

bash -n \
    /usr/local/bin/mscript-shizbendo-branding

/usr/local/bin/mscript-shizbendo-branding

echo
echo "[+] Shizbendo installed."
echo "[+] Start with: sudo shizbendo"
