import fs from 'node:fs';
import path from 'node:path';
import type { ImageMetadata } from 'astro';
import { imageMetadata } from 'astro/assets/utils';

// Every photograph lives in src/assets/photos/. Content files refer to one by its path
// ("/src/assets/photos/kitchen.jpg", which is what the editor saves) or just its file name.
// Astro resizes them and converts them to WebP when the site is built.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

const byName = new Map<string, ImageMetadata>();
for (const [file, mod] of Object.entries(files)) {
  byName.set(file.split('/').pop()!, mod.default);
}

/** "/src/assets/photos/kitchen.jpg", "kitchen.jpg" or "kitchen" -> the file name in the photos folder. */
function fileName(ref: string | null | undefined): string | undefined {
  if (!ref) return undefined;
  const name = decodeURIComponent(String(ref)).split('/').pop()!.trim();
  if (byName.has(name)) return name;
  return [...byName.keys()].find((key) => key.replace(/\.[^.]+$/, '') === name);
}

export function hasPhoto(ref: string | null | undefined): boolean {
  return fileName(ref) !== undefined;
}

export function photo(ref: string | null | undefined): ImageMetadata {
  const name = fileName(ref);
  if (!name) throw new Error(`Photo "${ref}" not found in src/assets/photos/`);
  return byName.get(name)!;
}

const ratios = new Map<string, number>();

/** A photo's shape, as width divided by height (1.5 is a 3:2 landscape). Read from the file itself. */
export async function ratio(ref: string): Promise<number> {
  const name = fileName(ref);
  if (!name) throw new Error(`Photo "${ref}" not found in src/assets/photos/`);
  if (!ratios.has(name)) {
    const data = fs.readFileSync(path.join(process.cwd(), 'src/assets/photos', name));
    const { width, height } = await imageMetadata(data, name);
    ratios.set(name, width / height);
  }
  return ratios.get(name)!;
}

const STEPS = [480, 800, 1200, 1600, 2000];

/** The widths to generate for a spot that shows a photo up to `max` pixels wide.
    (Astro drops any width larger than the photo file itself, so nothing is ever enlarged.) */
export function widthsUpTo(max = 2000): number[] {
  return STEPS.filter((w) => w <= max);
}
