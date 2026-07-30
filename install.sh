#!/usr/bin/env bash
set -Eeuo pipefail

[[ "$EUID" -eq 0 ]] || {
    echo "Run with sudo: sudo ./install.sh" >&2
    exit 1
}

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRANDING_DIR="/root/.decepticon/shizbendo-branding"
STATE_DIR="/var/lib/shizbendo"
STAMP="$(date +%Y%m%d-%H%M%S)"
INSTALL_BACKUP="$STATE_DIR/backups/$STAMP"
MANIFEST="$INSTALL_BACKUP/manifest"
CURRENT_MANIFEST="$STATE_DIR/current-manifest"

for command_name in docker python3 install cp; do
    command -v "$command_name" >/dev/null 2>&1 || {
        echo "[-] Missing dependency: $command_name" >&2
        exit 1
    }
done

if [[ ! -x /root/.local/bin/decepticon ]] &&
   ! command -v decepticon >/dev/null 2>&1; then
    echo "[-] Install and configure the upstream runtime first." >&2
    exit 1
fi

mkdir -p "$INSTALL_BACKUP"
: > "$MANIFEST"

backup_target() {
    local target="$1"
    local key
    key="$(printf '%s' "$target" | sed 's#^/##; s#/#__#g')"

    if [[ -e "$target" || -L "$target" ]]; then
        cp -a "$target" "$INSTALL_BACKUP/$key"
        printf 'RESTORE\t%s\t%s\n' \
            "$target" "$INSTALL_BACKUP/$key" >> "$MANIFEST"
    else
        printf 'REMOVE\t%s\t-\n' "$target" >> "$MANIFEST"
    fi
}

restore_manifest() {
    [[ -f "$MANIFEST" ]] || return 0

    while IFS=$'\t' read -r action target backup; do
        [[ -n "$target" ]] || continue
        rm -rf -- "$target"

        if [[ "$action" == "RESTORE" && -e "$backup" ]]; then
            mkdir -p "$(dirname "$target")"
            cp -a "$backup" "$target"
        fi
    done < "$MANIFEST"
}

on_error() {
    local exit_code=$?
    echo "[-] Installation failed; restoring previous files." >&2
    restore_manifest
    exit "$exit_code"
}
trap on_error ERR

for target in \
    /usr/local/bin/mscript-decepticon \
    /usr/local/bin/mscript-shizbendo-branding \
    /usr/local/bin/shizbendo-pty \
    /usr/local/bin/shizbendo \
    "$BRANDING_DIR"
do
    backup_target "$target"
done

rm -rf "$BRANDING_DIR"
mkdir -p "$BRANDING_DIR"

install -m 0755 "$PROJECT_DIR/bin/mscript-decepticon" \
    /usr/local/bin/mscript-decepticon
install -m 0755 "$PROJECT_DIR/bin/mscript-shizbendo-branding" \
    /usr/local/bin/mscript-shizbendo-branding
install -m 0755 "$PROJECT_DIR/bin/shizbendo-pty" \
    /usr/local/bin/shizbendo-pty
install -m 0755 "$PROJECT_DIR/bin/shizbendo" \
    /usr/local/bin/shizbendo

for branding_file in "$PROJECT_DIR"/branding/*; do
    [[ -f "$branding_file" ]] || continue
    install -m 0644 "$branding_file" \
        "$BRANDING_DIR/$(basename "$branding_file")"
done

bash -n /usr/local/bin/mscript-decepticon
bash -n /usr/local/bin/mscript-shizbendo-branding
bash -n /usr/local/bin/shizbendo
python3 -m py_compile /usr/local/bin/shizbendo-pty
rm -rf /usr/local/bin/__pycache__ 2>/dev/null || true

/usr/local/bin/mscript-shizbendo-branding

cp "$MANIFEST" "$CURRENT_MANIFEST"
trap - ERR

echo
 echo "[+] Shizbendo installed successfully."
echo "[+] Start with: sudo shizbendo"
echo "[+] Previous files are backed up under: $INSTALL_BACKUP"
