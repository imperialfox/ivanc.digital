# Changelog

All notable changes to ivanc.digital. Newest first. Version numbers are in `_config.yml` and used to refresh cached CSS and JS.

Numbering (open item, proposed): `0.x.0` for new features while building, `0.x.y` for fixes, `1.0.0` for the first public launch.

## 0.2.7 - 2026-10-20

- Beth & Kyle proposal updated: ceremony and speeches audio is now part of Full Day Video Coverage (£800, total unchanged at £1,175). The Highlights Reel shows as "Included" instead of a gift. Same-Day Edit and Drone Footage add-ons removed. Raw footage now reads "on request".

## 0.2.6 - 2026-10-20

- New private page type for client proposals, in `proposals/`. First one: Beth & Kyle wedding pricing at `/proposals/beth-and-kyle/`. Nothing on the site links to it, so only people you send the address to will find it. It carries `noindex: true`, which asks search engines to skip it.
- New file: `assets/css/proposal.css` (cream and red, index-style rows, one red panel for the gift, add-ons that open and close with no script).
- `_layouts/default.html` adds a "noindex" tag to any page that sets `noindex: true`.

## 0.2.5 - 2026-10-20

- Cubes now stack properly. A cube dropped on another nests into its top face like a real stack of isometric cubes, instead of hovering above it with a gap, and settles into line with the one below. The higher cube is always drawn in front. The numbers `STACK` and `STACK_PULL` at the top of `cubes.js` control this.

## 0.2.4 - 2026-10-20

- The pinned logo moves to the top left and replaces the small "ivanc.digital" text in the nav, so the name is not shown twice. With `pinned_logo: false` the text comes back.

## 0.2.3 - 2026-10-20

- Scroll button is centred on phones (still at the bottom of the screen). The footer gets extra room on phones so the button never covers its text.

## 0.2.2 - 2026-10-20

- Fix: the scroll button goes back to the spinning asterisk that fades into the arrow.
- Your Imperial Fox logo is now pinned at the top centre of every page instead. Switch off with `pinned_logo: false` in `_config.yml`.

## 0.2.1 - 2026-10-20

- Logo saved as `assets/images/logo.svg`. (Briefly used as the scroll button spinner; replaced in 0.2.2.)

## 0.2.0 - 2026-10-20

Scroll effects test, inspired by the 2023 Readymag site. Switch them all off with `scroll_effects: false` in `_config.yml`.

- Scroll button: an asterisk spins as you scroll, then turns into an arrow that returns you to the top.
- Soft fade-ins: cards, index rows, closing line and About/Contact sections fade up as they scroll into view. Off with reduced motion.
- Draggable cubes on Home, by the closing line: drag, flick, tap to hop, stack them. Mouse and touch.
- New files: `effects.css`, `scroll-button.js`, `reveal.js`, `cubes.js`, `_includes/scroll-button.html`.

## 0.1.1 - 2026-10-20

- Custom domain ivanc.digital connected (CNAME). `baseurl` set back to empty so links no longer double up the repo name.

## 0.1.0 - 2026-10-20

First scaffold, with placeholders.

- Jekyll site structure agreed in the design brief: Home, About, Contact, 404.
- Single-page Home: big Instrument Serif wordmark with soft glow and film grain, motto, curated work grid, plain index list, closing line.
- Light mode (cream and red) and dark mode (near-black and lighter red), following the system setting, with a hidden preferences panel to override.
- Self-hosted fonts: Inter Tight, Inter, Instrument Serif (Latin, `.woff2`).
- Six placeholder projects, plus a per-project asset folder for each.
- Media fallbacks: calm "unavailable" panels for failed previews, images and videos, with Try again on full videos.
- Click-to-load full video, lazy-playing preview clips, round red cursor (desktop only), gentle parallax (Home only).
- README with folder map and how to add new work.
