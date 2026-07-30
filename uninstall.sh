#!/usr/bin/env bash
set -euo pipefail

[[ "$EUID" -eq 0 ]] || {
    echo "Run with sudo: sudo ./uninstall.sh" >&2
    exit 1
}

STATE_DIR="/var/lib/shizbendo"
MANIFEST="$STATE_DIR/current-manifest"

[[ -f "$MANIFEST" ]] || {
    echo "[-] No Shizbendo installation manifest was found." >&2
    echo "[-] Nothing was removed." >&2
    exit 1
}

while IFS=$'\t' read -r action target backup; do
    [[ -n "$target" ]] || continue
    rm -rf -- "$target"

    if [[ "$action" == "RESTORE" && -e "$backup" ]]; then
        mkdir -p "$(dirname "$target")"
        cp -a "$backup" "$target"
        echo "[+] Restored: $target"
    else
        echo "[+] Removed installed file: $target"
    fi
done < "$MANIFEST"

rm -f "$MANIFEST"

echo
 echo "[+] Shizbendo customization removed."
echo "[+] Upstream data, engagements, databases, and volumes were preserved."
