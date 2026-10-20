# ivanc.digital

Portfolio site for Ivan, videographer and graphic designer. Built with Jekyll and hosted on GitHub Pages. Hand-written HTML, CSS and a few small scripts. No frameworks.

Priorities, in order: **fast loading**, **fully responsive**, **creative personality**, **easy to edit by hand**.

Status: first scaffold with placeholders. See `CHANGELOG.md`.

## Folder map

```
index.html                 Home (wordmark, motto, work grid, index list)
about.html                 About
contact.html               Contact
404.html                   Page not found
_config.yml                Site settings (motto, version, wordmark video switch, analytics)
_data/links.yml            Email, socials, booking link, optional extras
_projects/                 One small file per piece of work
_layouts/                  default.html (every page) and project.html (each project page)
_includes/                 nav, footer, work grid, index list, project card, preferences panel
assets/css/                Styles, split by job (see below)
assets/js/                 Small scripts, one job each (see below)
assets/fonts/              Self-hosted fonts (.woff2)
assets/images/             Favicon, logo, social preview, wordmark loop
assets/projects/<name>/    Preview clip, poster and stills for each project
```

### CSS files

| File | What it does |
| --- | --- |
| `colours-and-type.css` | The reds, cream, black and the three typefaces. Change the look here. |
| `base.css` | Page defaults, spacing, keyboard focus, reduced motion. |
| `components.css` | Nav, footer, buttons, cards, media blocks, "unavailable" panel, preferences panel, cursor. |
| `home.css` | Wordmark, grain, motto, work grid, index list, closing line. |
| `about-and-contact.css` | About and Contact pages. |
| `project.css` | Individual project pages. |
| `effects.css` | Scroll button, fade-ins and cubes. Loaded only when `scroll_effects` is true. |

### JavaScript files

| File | What it does | Loads on |
| --- | --- | --- |
| `preferences.js` | The hidden light/dark panel (the quiet dot in the footer). | Every page |
| `media-fallback.js` | Fades pictures in, and shows "unavailable" if one can't load. | Every page |
| `preview-loader.js` | Plays preview clips only while on screen. | Every page |
| `custom-cursor.js` | Round red cursor. Does nothing on touch screens. | Every page |
| `parallax.js` | Gentle scroll depth on the wordmark. | Home only |
| `video-loader.js` | Loads the full video only when Play is pressed. | Project pages only |
| `scroll-button.js` | Asterisk that spins as you scroll, then fades into a back-to-top arrow. | Every page (if `scroll_effects` is true) |
| `reveal.js` | Soft fade-up of things as they scroll into view. | Every page (if `scroll_effects` is true) |
| (pinned logo) | No script: `_includes/pinned-logo.html` plus styles in `effects.css`. Off with `pinned_logo: false`. | Every page |
| `cubes.js` | Draggable, stackable cubes by the closing line (Easter egg). | Home only |

## Adding a new piece of work

1. Create a file in `_projects/`, for example `_projects/brand-name-campaign.md`. Copy `north-designerwear-spring.md` and change the details.
2. Create a folder `assets/projects/brand-name-campaign/` and drop in `preview.mp4`, `poster.webp` and any stills.

The fields in a project file:

| Field | Meaning |
| --- | --- |
| `title` | Brand or client name |
| `role` | `Shot`, `Edited`, or `Shot and edited` |
| `year` | Year |
| `ratio` | `9x16` for vertical, `16x9` for widescreen |
| `order` | Position in the grid. Use steps of ten (10, 20, 30) so new work can slot in between. |
| `published` | `false` hides it from the site while you stage it |
| `placeholder` | `true` shows a "Placeholder" block. Delete the line once real media is in. |
| `preview` | Path to the short muted looping clip |
| `poster` | Path to the still shown before the clip loads |
| `video_embed` | The host's embed link (for example `https://player.vimeo.com/video/123456`) |
| `video_watch` | Optional normal watch link, offered if the embed fails |

The grid and the index list both read these same files, so nothing is written twice.

## Private client proposals

Pages in `proposals/` are not linked from anywhere on the site. Send the address to the client directly (for example `ivanc.digital/proposals/beth-and-kyle/`). Each one sets `noindex: true` so search engines skip it, and uses `assets/css/proposal.css`. To make another, copy `proposals/beth-and-kyle.html`, change the `permalink` and the words, and check the Total adds up. Note that the GitHub repo is public, so the page text can be read there.

## The big wordmark

By default the wordmark is live text in Instrument Serif with a soft glow and a film-grain texture, all in CSS.

To use an exported loop from DaVinci Resolve instead, put these files in `assets/images/wordmark/` and set `wordmark_video: true` in `_config.yml`:

- `wordmark-light.mp4` and `wordmark-light.webm` (on the cream background)
- `wordmark-dark.mp4` and `wordmark-dark.webm` (on the near-black background)
- `wordmark-light-poster.webp` and `wordmark-dark-poster.webp` (a still of the first frame)

Aim for a seamless 3 to 5 second loop, around 500 KB or less per file. Use MP4/WebM rather than GIF: it keeps the glow, blur and grain smooth and is far smaller.

## Colours and type

Light mode is cream `#F4F0E6` with bold red `#E02424` for big shapes and a deeper red `#B30000` for small text, links and buttons. Dark mode is `#0A0A0A` with `#FF4D4D`. The site follows the visitor's system setting, and the footer dot opens a panel to override it. All of this lives in `assets/css/colours-and-type.css`.

Fonts are Inter Tight (headings, nav, labels), Inter (body) and Instrument Serif (display). Instrument Serif has no bold, so use italics or size for emphasis.

## Media that can't load

Every photo and video sits in a block with a reserved shape, so nothing jumps. If a clip or image fails, or a video is still not ready after 10 seconds, the block shows a calm "unavailable" message. A full video that fails also offers Try again. The wording is in `assets/js/media-fallback.js` and `assets/js/video-loader.js`.

## Running it locally

```
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000. Needs Ruby.

## Publishing on GitHub Pages

The site is deployed from the `main` branch (root) in the repo's Settings, then Pages. It is served from the custom domain https://ivanc.digital, set by the `CNAME` file, so `baseurl` in `_config.yml` stays empty. Turn on "Enforce HTTPS" in the same Pages settings once the certificate is ready.

If you ever serve the site from `imperialfox.github.io/ivanc.digital` instead, set `baseurl: "/ivanc.digital"`.

## Quirks worth knowing

- The work grid flows down each column, so reordering changes the rhythm. Check it in the browser after changing `order` numbers.
- The slow-loading check (10 seconds) applies to videos and embedded players. Broken images are caught straight away.
- Fonts, colours and the motto are the only things you should need to touch for a look change: `colours-and-type.css` and `_config.yml`.
- The email, Instagram and booking links in `_data/links.yml` are placeholders until replaced.

## Still to do

Tracked in the design brief: contact page wording, final video host (Vimeo suggested), image resizing approach, favicon and social preview image from the real logo, inlined first-screen CSS, and optional Lighthouse checks on each push.
