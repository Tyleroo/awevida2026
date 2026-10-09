import type { ImageMetadata } from 'astro';

// Every photograph lives in src/assets/photos/<id>.jpg. Pages and data files refer to a photo by its id
// (the file name without .jpg); Astro resizes and converts them to WebP at build time.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

const byId = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  byId.set(path.split('/').pop()!.replace(/\.jpg$/, ''), mod.default);
}

export function photo(id: string): ImageMetadata {
  const found = byId.get(id);
  if (!found) throw new Error(`Photo "${id}" not found in src/assets/photos/`);
  return found;
}

const STEPS = [480, 800, 1200, 1600, 2000];

/** The widths to generate for a spot that shows a photo up to `max` pixels wide.
    (Astro drops any width larger than the photo file itself, so nothing is ever enlarged.) */
export function widthsUpTo(max = 2000): number[] {
  return STEPS.filter((w) => w <= max);
}
