// The homes. Each one has a JSON file in ./projects/ holding its title, location, intro and photo rows.
// The order here is the order of the cards on the Portfolio page; `card` is the photo used on the card.

import cove from './projects/the-cove.json';
import cape from './projects/the-cape.json';
import bali from './projects/bali.json';
import soulCottage from './projects/soul-cottage.json';
import color from './projects/color.json';
import brookside from './projects/brookside.json';
import dalton from './projects/dalton.json';
import treehouse from './projects/the-treehouse.json';
import bubbly from './projects/bubbly.json';

export interface ProjectPhoto { id: string; alt: string; w: number; h: number }
export interface ProjectRow { kind: 'fit' | 'crop'; items: ProjectPhoto[] }
export interface Project {
  slug: string;
  title: string;
  location: string;
  intro: string;
  hero: { id: string; alt: string };
  rowGap: number;
  rows: ProjectRow[];
  card: string;
}

export const projects: Project[] = [
  { ...cove, card: '1c9ab646e9404317c1bb2551ed6eecf6' },
  { ...cape, card: 'ea64f498a99af4400771cded6814a319' },
  { ...bali, card: '8249b2ecb7598afedbf0f76da10e8f43' },
  { ...soulCottage, card: 'e1ff942a10c69c76e317aba64e8ec849' },
  { ...color, card: '54e636020abedbd64e6df14f40e98e07' },
  { ...brookside, card: '6a6c3540163ba7acf77f9f8c5e863e58' },
  { ...dalton, card: '49dca0652fd83c7217b9d1d77104f837' },
  { ...treehouse, card: '50b711c75e569b7eb6b3ffa75f2fadde' },
  { ...bubbly, card: '6778366ed25d9822772f938db971aa3a' },
] as Project[];

export const projectUrl = (slug: string) => `/portfolio/${slug}/`;
