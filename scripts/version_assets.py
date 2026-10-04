#!/usr/bin/env python3
"""Update asset URLs from their content; run before publishing to GitHub Pages."""
import argparse
import hashlib
from pathlib import Path
import re

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--check', action='store_true', help='Fail if asset versions are stale.')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
page = root / 'index.html'
original = page.read_text(encoding='utf-8')
updated = original
for name in ('style.css', 'main.js', 'favicon.svg', 'social.png'):
    asset = root / 'assets' / name
    version = hashlib.sha256(asset.read_bytes()).hexdigest()[:12]
    pattern = re.escape('/assets/' + name) + r'(?:\?v=[a-f0-9]+)?(?=["\'])'
    updated, count = re.subn(pattern, '/assets/' + name + '?v=' + version, updated)
    if not count:
        raise SystemExit(f'Missing reference in index.html: {name}')
if args.check:
    if updated != original:
        raise SystemExit('Stale asset versions. Run python3 scripts/version_assets.py.')
    print('Asset versions are current.')
elif updated != original:
    page.write_text(updated, encoding='utf-8')
    print('Asset URLs updated from SHA-256 content hashes.')
else:
    print('Asset versions are already current.')
