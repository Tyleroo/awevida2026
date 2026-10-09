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
| `/portfolio/<home>/` | One page per home | `src/pages/portfolio/[slug].astro` + `src/data/homes/*.json` |
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

## Editing the site without code (Pages CMS)

The wording and photos can be changed in a browser with [Pages CMS](https://pagescms.org), a free editor that
works directly on this repository.

1. Go to https://app.pagescms.org and sign in. The repository owner signs in with GitHub and installs the
   Pages CMS app on this repository; other people are invited by email from the editor's Collaborators screen
   and need no GitHub account.
2. Open this repository. The sidebar lists what can be edited:
   - **Homes**: one entry per home, with its name, location, "About this home" paragraph, main photo,
     Portfolio card, Home page slider settings and its gallery, row by row.
   - **Home page, About page, Portfolio page, Contact page, Page Not Found page**: the wording and photos on each.
   - **Site-wide**: the menu names, footer links, the scrolling photo strip and other wording used on every page.
   - **Media**: every photo. New photos are uploaded here or from any photo field.
3. Make a change and press Save. That commits to this repository, the site rebuilds, and the change is live
   about a minute later. Each save is a separate entry in the repository's history, so any edit can be undone.

Good to know:

- To swap a gallery photo: Homes > the home > Gallery > open the row > open the photo > choose or upload another.
  The row resizes itself to the new photo's shape.
- Upload JPEG, PNG or WebP. Large files are fine: the site makes its own smaller copies.
- A field left empty is simply left off the page.
- The layout and styling are not editable here; those are in the code (`src/`).
- `.pages.yml` at the top of the repository defines the editor's screens. If a key is added to a content file,
  add a matching field there, or the editor will drop the key the next time it saves that file.

## Content files

Everything the editor changes is a JSON file under `src/data/`:

- `src/data/homes/<name>.json`: one per home. The file name is the page address
  (`the-cove.json` is `/portfolio/the-cove/`). Adding a file adds a home; nothing else needs registering.
  - `rows` is the gallery. A `"fit"` row shows every photo whole, sized so the row shares one height.
    A `"crop"` row is equal tiles with each photo trimmed to fill its tile.
  - `portfolio.order` and `slider.order` set the home's position on the Portfolio page and in the Home slider.
- `src/data/pages/*.json`: the wording and photos for each page.
- `src/data/site.json`: wording and photos shared by every page.

Photos are referred to by path, for example `/src/assets/photos/kitchen.jpg`. A reference to a photo that
isn't in the folder is skipped (with a warning in the build log) so one mistake can't stop the site building.

The Formspree form ID and the site address are technical settings in `src/data/site.ts`.

## Where things are

- `src/styles/tokens.css` — the brand colours, fonts and spacing.
- `src/styles/components.css` — header, footer, buttons, sliders, cards, form.
- `src/styles/pages.css` — the layout of each page.
- `src/data/` — the editable content (see above).
- `.pages.yml` — the Pages CMS editor's configuration.
- `src/components/` — the reusable pieces (header, footer, hero slider, photo strip and so on).
- `public/` — files copied to the site as they are (`.htaccess`, favicon, `robots.txt`).

Fonts (Prompt, Mulish, Playfair Display) are bundled with the site, so pages make no requests to Google Fonts.
Photos are converted to WebP in several sizes when the site is built.
