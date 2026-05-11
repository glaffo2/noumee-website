# Image Optimization

Convert JPG/PNG assets to compressed WebP files without modifying originals.

## Setup

```powershell
python -m pip install -r tools/requirements.txt
```

## Run

```powershell
python tools/optimize-images.py --input assets --output assets-optimized --quality 82 --max-width 1920 --overwrite
```

Use lower quality for smaller files, for example `--quality 74`.

The script prints before/after sizes for each file and a total savings summary.
