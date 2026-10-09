# AweVida website

The AweVida site as a static website, built with [Astro](https://astro.build). Building it produces a folder of
plain HTML, CSS, JavaScript and images (`dist/`) that can be served by any web host. There is no database, no
server code and no CMS.

## Pages

| Address | What it is | File |
| --- | --- | --- |
| `/` | Home | `src/pages/index.astro` |
| `/about/` | About Gabi | `src/pages/about.astro` |
| `/portfolio/` | Portfolio grid | `src/pages/portfolio/index.astro` |
| `/portfolio/<home>/` | One page per home (9 of them) | `src/pages/portfolio/[slug].astro` + `src/data/projects/*.json` |
| `/contact/` | Contact form | `src/pages/contact.astro` |
| `/404.html` | Page Not Found | `src/pages/404.astro` |

## Working on it

You need [Node.js](https://nodejs.org) 22.12 or newer.

```
npm install        # once
npm run dev        # preview at http://localhost:4321 while you edit
npm run build      # writes the finished site to dist/
npm run preview    # look at the built site before uploading
```

## Putting it on Cloudways

1. In Cloudways, open the server, choose **Add Application** and pick **Custom PHP** (it serves plain files).
2. Open the new application's **Access Details** and create SFTP credentials.
3. Connect with an SFTP program (FileZilla, Transmit, Cyberduck) and open `public_html`.
   Delete the placeholder `index.php` that Cloudways puts there.
4. Upload **everything inside `dist/`** into `public_html`, including the hidden `.htaccess` file
   (turn on "show hidden files" in your SFTP program if you can't see it).
5. In the application's **Domain Management**, add `awevida.com` and `www.awevida.com` and make one primary.
6. In **SSL Certificate**, issue the free Let's Encrypt certificate for both names.
7. Point DNS at the Cloudways server: an `A` record for `awevida.com` to the server's IP address, and a
   `CNAME` for `www` to `awevida.com`.

### Publishing changes

Pushing to the `main` branch on GitHub publishes the site: the workflow in `.github/workflows/deploy.yml`
builds it and uploads `dist/` to `public_html` over SFTP. It needs three repository secrets, set under
Settings > Secrets and variables > Actions: `SFTP_HOST` (the server's public IP), `SFTP_USER` and
`SFTP_PASSWORD` (the application's SFTP credentials from Cloudways' Access Details).

The upload only adds and replaces files; it never deletes anything on the server.

To publish by hand instead: `npm run build`, then upload the contents of `dist/`, replacing what's there.

## Things to fill in

All in `src/data/site.ts`:

- `formspreeId` — the contact form will not deliver messages until this is a real Formspree form ID.
- `email` and `basedIn` — shown on the Contact page once filled in.
- `follow` and `socialLinks` — the social links. LinkedIn and YouTube are hidden until they have addresses.
- `legalNote` — any extra footer text after the copyright line.

Each home's intro paragraph is the `intro` field in its file under `src/data/projects/`. While it is empty,
the page shows just the name and location.

## Adding a home

1. Put its photos in `src/assets/photos/` (JPEG, any file name ending `.jpg`).
2. Copy one of the files in `src/data/projects/` to a new name, e.g. `my-new-home.json`, and edit it:
   - `slug` is the page address (`/portfolio/my-new-home/`).
   - `hero` is the wide photo at the top. Photos are referred to by file name without `.jpg`.
   - `rows` are the rows of photos, top to bottom. A `"fit"` row shows every photo whole: give each photo's
     `w` and `h` (only the proportion matters) and the row is sized so they share one height. A `"crop"`
     row is equal columns, with each photo cropped to the `w` x `h` shape given.
   - `rowGap` is the space between rows, in pixels.
3. Add it to the list in `src/data/projects.ts`, with the photo to use on its Portfolio card.
4. To feature it in the Home slider, add a line to `slides` in `src/pages/index.astro`.

## Where things are

- `src/styles/tokens.css` — the brand colours, fonts and spacing.
- `src/styles/components.css` — header, footer, buttons, sliders, cards, form.
- `src/styles/pages.css` — the layout of each page.
- `src/components/` — the reusable pieces (header, footer, hero slider, photo strip and so on).
- `public/` — files copied to the site as they are (`.htaccess`, favicon, `robots.txt`).

Fonts (Prompt, Mulish, Playfair Display) are bundled with the site, so pages make no requests to Google Fonts.
Photos are converted to WebP in several sizes when the site is built.
