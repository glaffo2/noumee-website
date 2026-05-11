from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ModuleNotFoundError:
    print("Missing dependency: Pillow")
    print("Install it with: python -m pip install -r tools/requirements.txt")
    sys.exit(1)


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png"}


def format_size(size: int) -> str:
    for unit in ("B", "KB", "MB"):
        if size < 1024 or unit == "MB":
            return f"{size:.1f} {unit}" if unit != "B" else f"{size} {unit}"
        size /= 1024
    return f"{size:.1f} MB"


def output_path_for(source: Path, output_dir: Path, input_dir: Path) -> Path:
    relative = source.relative_to(input_dir)
    return output_dir / relative.with_suffix(".webp")


def convert_image(source: Path, destination: Path, quality: int, max_width: int | None) -> tuple[int, int]:
    destination.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)

        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")

        if max_width and image.width > max_width:
            ratio = max_width / image.width
            target_size = (max_width, round(image.height * ratio))
            image = image.resize(target_size, Image.Resampling.LANCZOS)

        save_kwargs = {
            "format": "WEBP",
            "quality": quality,
            "method": 6,
        }

        if image.mode == "RGBA":
            save_kwargs["lossless"] = False

        image.save(destination, **save_kwargs)

    return source.stat().st_size, destination.stat().st_size


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert website images to compressed WebP files.")
    parser.add_argument("--input", default="assets", help="Input image folder. Default: assets")
    parser.add_argument("--output", default="assets-optimized", help="Output folder. Default: assets-optimized")
    parser.add_argument("--quality", type=int, default=82, help="WebP quality from 1 to 100. Default: 82")
    parser.add_argument("--max-width", type=int, default=1920, help="Resize images wider than this. Use 0 to disable. Default: 1920")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite existing WebP files")
    args = parser.parse_args()

    input_dir = Path(args.input).resolve()
    output_dir = Path(args.output).resolve()
    max_width = args.max_width or None

    if not input_dir.exists():
        print(f"Input folder not found: {input_dir}")
        return 1

    sources = sorted(
        path
        for path in input_dir.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )

    if not sources:
        print(f"No JPG/PNG images found in {input_dir}")
        return 0

    total_before = 0
    total_after = 0
    converted = 0

    for source in sources:
        destination = output_path_for(source, output_dir, input_dir)

        if destination.exists() and not args.overwrite:
            print(f"Skipped existing: {destination}")
            continue

        before, after = convert_image(source, destination, args.quality, max_width)
        total_before += before
        total_after += after
        converted += 1

        saved = 100 - (after / before * 100) if before else 0
        print(
            f"{source.relative_to(input_dir)} -> {destination.relative_to(output_dir)} "
            f"{format_size(before)} to {format_size(after)} ({saved:.0f}% smaller)"
        )

    if converted:
        saved = 100 - (total_after / total_before * 100) if total_before else 0
        print()
        print(f"Converted {converted} image(s)")
        print(f"Total: {format_size(total_before)} to {format_size(total_after)} ({saved:.0f}% smaller)")
    else:
        print("Nothing converted. Use --overwrite to regenerate existing files.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
