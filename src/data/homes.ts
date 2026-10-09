// The homes. Each one is a JSON file in ./homes/ and its file name is its web address:
// homes/the-cove.json is the page at /portfolio/the-cove/. Adding a file adds a home.
import { hasPhoto } from '../lib/photos';

export interface Picture { image: string; alt: string }
export interface Row { layout: 'fit' | 'crop'; photos: Picture[] }
export interface Home {
  slug: string;
  title: string;
  location: string;
  intro: string;
  hero: Picture;
  /** Where its card sits on the Portfolio page, and the photo on the card. */
  portfolio: { order: number; image: string };
  /** Whether and where it appears in the Home page slider, with that slide's photo and short label. */
  slider: { show: boolean; order: number; image: string; label: string };
  /** Space between photo rows, in pixels. */
  rowGap: number;
  rows: Row[];
}

const files = import.meta.glob<{ default: Partial<Home> }>('./homes/*.json', { eager: true });

const picture = (p?: Partial<Picture> | null): Picture => ({ image: p?.image ?? '', alt: p?.alt ?? '' });

// Fill in anything left blank so a half-finished entry never stops the site from building,
// and leave out photos that are missing or point at a file that isn't there.
function tidy(slug: string, raw: Partial<Home>): Home {
  const hero = picture(raw.hero);
  return {
    slug,
    title: raw.title?.trim() || slug,
    location: raw.location?.trim() ?? '',
    intro: raw.intro?.trim() ?? '',
    hero,
    portfolio: { order: Number(raw.portfolio?.order) || 999, image: raw.portfolio?.image || hero.image },
    slider: {
      show: raw.slider?.show ?? false,
      order: Number(raw.slider?.order) || 999,
      image: raw.slider?.image || hero.image,
      label: raw.slider?.label?.trim() ?? '',
    },
    rowGap: Number(raw.rowGap) || 20,
    rows: (raw.rows ?? [])
      .map((row) => ({
        layout: row?.layout === 'crop' ? ('crop' as const) : ('fit' as const),
        photos: (row?.photos ?? []).map(picture).filter((p) => hasPhoto(p.image)),
      }))
      .filter((row) => row.photos.length > 0),
  };
}

const byTitle = (a: Home, b: Home) => a.title.localeCompare(b.title);

/** Every home that has a main photo, in Portfolio page order. */
export const homes: Home[] = Object.entries(files)
  .map(([file, mod]) => tidy(file.split('/').pop()!.replace(/\.json$/, ''), mod.default))
  .filter((home) => hasPhoto(home.hero.image))
  .sort((a, b) => a.portfolio.order - b.portfolio.order || byTitle(a, b));

/** The homes shown in the Home page slider, in slide order. */
export const sliderHomes: Home[] = homes
  .filter((home) => home.slider.show && hasPhoto(home.slider.image))
  .sort((a, b) => a.slider.order - b.slider.order || byTitle(a, b));

export const homeUrl = (slug: string) => `/portfolio/${slug}/`;
