import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// A fully static site: `npm run build` writes plain HTML, CSS, JS and images to ./dist,
// which is what gets uploaded to the web server's public_html folder.
export default defineConfig({
  site: 'https://awevida.com',
  trailingSlash: 'always',
  // Old addresses that should forward to a home's new address after a rename.
  redirects: { '/portfolio/soul-cottage': '/portfolio/soul/' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
