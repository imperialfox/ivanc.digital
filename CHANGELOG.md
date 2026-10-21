# Changelog

All notable changes to ivanc.digital. Newest first. Version numbers are in `_config.yml` and used to refresh cached CSS and JS.

Numbering (open item, proposed): `0.x.0` for new features while building, `0.x.y` for fixes, `1.0.0` for the first public launch.

## 0.2.28 - 2026-10-21

- Beth & Kyle proposal: "Copy my choices" now uses the classic select-and-copy method first (more reliable on iPhone Safari), with the newer clipboard method as the backup.

## 0.2.27 - 2026-10-21

- Beth & Kyle proposal: the email button no longer pre-fills the message (some mail apps showed it as %20 and %2C codes). It now just opens a blank email to info@ivanc.digital. Use Copy my choices, then paste.

## 0.2.26 - 2026-10-21

- Beth & Kyle proposal: the looping clip now shows a small play button if the phone blocks autoplay (for example iPhone Low Power Mode), and loads fully ahead of time. Removed the 10 second "Preview unavailable" timer that could hide a slow-loading clip.

## 0.2.25 - 2026-10-21

- Beth & Kyle proposal: a "Copy my choices" box at the end. It lists their chosen extras, total, deposit, balance and song as plain ready-to-paste text, with a Copy button. The song question now has a small text box that feeds into it.

## 0.2.24 - 2026-10-21

- Beth & Kyle proposal: travel included within 100 miles of base (was 50). Extra distance still £0.45 per mile, return.
- Beth & Kyle proposal address is now `/proposals/beth-and-kyle-hygetsbg/` (random code so it cannot be guessed). The old address stops working once this is live.

## 0.2.23 - 2026-10-21

- Beth & Kyle proposal is now a journey: one long page told as the day (cover and letter, a looping "How I film" clip, the day in five moments, the two films, a song question, add-ons with a live total including VAT and deposit, the steps from yes to delivery, and a thank-you). Dates for the wedding (Thursday 21 October 2027), balance and delivery are written in.
- New layout `_layouts/proposal.html` (no site menu or footer), styles in `assets/css/proposal.css`, script in `assets/js/proposal.js`, files in `assets/proposals/beth-and-kyle/`.
- Light by default with the footer "Change appearance" switch, same rule as the rest of the site.
- Optional "A message from me" video: put `ivan-hello.mp4` (and `ivan-hello-poster.jpg`) in `assets/proposals/beth-and-kyle/` and the section appears on its own. Without the file it stays hidden.
- The earlier price-list version is saved in git as the tag `beth-kyle-v1`.

## 0.2.22 - 2026-10-21

- Link previews: any page can now set `og_image` (and optionally `og_title`) in its front matter, so a shared link shows an image and title in WhatsApp, iMessage and similar. The Beth & Kyle proposal uses a text-only card, `assets/images/proposals/beth-and-kyle-preview.png`.
- Sent links keep their old preview in some apps for a while after a change.

## 0.2.21 - 2026-10-21

- Home: a "Fashion" gallery section sits between the work grid and the index list. It is a Playbook embed, set up like the video embeds: it starts as a plain palette block with a "View gallery" button, and nothing from Playbook loads until the button is pressed. This keeps third-party scripts off the first load and stops the embed catching scroll on phones.
- If the gallery doesn't load within about 10 seconds, it swaps to the usual calm panel ("This gallery is unavailable right now") with Try again, plus an "Open the gallery on Playbook" link once one is set.
- Height is 600px at most and shorter on small screens (`clamp(26rem, 75svh, 37.5rem)`), so it never fills a whole phone screen. It fades up with the rest of Home.
- Everything editable is in `_data/gallery.yml`: on/off, the label, an optional caption, the embed link, an optional Playbook page link and an optional poster still. Set `enabled: false` to hide the section.
- New files: `_includes/gallery.html`, `assets/js/gallery-loader.js` (Home only), `_data/gallery.yml`. Styles are in `home.css`; `reveal.js` lists the new section.
- Known limit: the panel appears when the gallery stalls or the frame reports an error. If Playbook refuses the connection outright, the browser may show its own error page inside the frame, because a page can't see inside another site's frame.
- Open: the "watch" link is empty because the normal Playbook page address is not confirmed, and there is no poster still yet.

## 0.2.20 - 2026-10-21

- About page, "How it started": a photo (the bus mirror shot) now sits beside the story on wide screens and below it on phones. It is exported as WebP at two sizes (`bus-mirror-480.webp`, 18 KB, and `bus-mirror-768.webp`, 37 KB, from a 215 KB JPEG; the original is only 793 px wide, so there is no larger size). Embedded camera and location data was stripped. It lazy-loads, keeps its shape while loading, fades in and uses the usual "Image unavailable" panel if it fails.
- The layout is a small `.about-story` and `.about-figure` rule in `about-and-contact.css`.

## 0.2.19 - 2026-10-21

- About page paragraphs restyled in the spirit of the Adriano Santos reference: Inter Tight Medium (already on the site, no new font file), a little larger, snug line spacing (1.2), slight negative letter spacing, a narrower column (48 characters) and one blank line between paragraphs. The opening line stays in Instrument Serif.
- The styling is one rule in `about-and-contact.css`, with a comment listing the old values in case it needs to go back.

## 0.2.18 - 2026-10-21

- About page: the gear list is filled in, kept short on purpose: Fujifilm X-T5 for cameras, DaVinci Resolve Studio for editing and grading. Supporting kit (audio, gimbal, monitoring, storage) is not listed, since visitors don't need it.
- Lenses is still a placeholder until the lens list is confirmed.

## 0.2.17 - 2026-10-21

- About page portrait swapped for the version graded in DaVinci Resolve. The black bars were cropped off, leaving a clean 3:4 frame that fits the existing portrait shape, so no layout change.
- Re-exported as WebP at three sizes: `ivan-portrait-480.webp` (65 KB), `ivan-portrait-768.webp` (143 KB) and a new `ivan-portrait-1080.webp` (230 KB) for sharper display on large and high-density screens. The browser picks the right one with `srcset`. Colours are untouched (the file was already sRGB).

## 0.2.16 - 2026-10-21

- About page: the placeholder text is replaced with Ivan's own copy, written in first person: the opening line, two short paragraphs about the studio and the work, and the "How it started" story. The gear and software list is still placeholder text until the kit list is ready.
- Note: the design brief asked for a third-person bio. The About page is now first person at Ivan's request, so Contact and the footer credit are worth a look for tone.

## 0.2.15 - 2026-10-21

- About page: the portrait placeholder is replaced with Ivan's photo. It is shown uncropped at 3:4 (the placeholder was 4:5).
- The photo is exported as WebP at two sizes (`ivan-portrait-480.webp`, 71 KB, and `ivan-portrait-768.webp`, 175 KB) in `assets/images/`, down from a 352 KB JPEG. The browser picks the right one with `srcset`. Width and height are set so the layout never jumps, and it fades in over the palette block and uses the usual "Image unavailable" panel if it fails.
- The original's embedded location and camera data was stripped, and the colour was converted from Display P3 to sRGB so it looks the same on every screen.

## 0.2.14 - 2026-10-20

- Film grain is switched off for now, because grain over a large area can slow scrolling. It is not deleted: set `grain: true` in `_config.yml` to turn it back on (live-text wordmark only). The grain CSS stays in `home.css`.

## 0.2.13 - 2026-10-20

- Home grain now ignores the page's side gutters and the hero's top padding. It runs edge to edge across the screen, starts level with the top of the wordmark, and still stops 30px above the work grid (`--grain-gap`). The hero's top padding is now a named value (`--hero-top`) so the grain and the padding stay in step. The previous rule is kept in a comment in `home.css` so it is easy to revert.

## 0.2.12 - 2026-10-20

- The film grain now covers the whole top section of Home (the wordmark, the white space to its right and the motto) instead of only the letters. It runs the full content width and stops 30px above the work grid. The 30px is `--grain-gap` in `home.css`.
- To do this, the `grain` class moved from the wordmark heading to the hero section in `index.html`. It is only added when the live-text wordmark is used (`wordmark_video: false`), since an exported wordmark video has its own grain.

## 0.2.11 - 2026-10-20

- The site now always opens in light mode. It no longer follows the visitor's device light/dark setting. Those rules are commented out (not deleted) in `colours-and-type.css`, `home.css` and `default.html`, each with a note on how to bring them back.
- The footer has a visible light/dark switch next to "Designed by Ivan". Dark mode is remembered on that device. The browser bar colour changes with it.
- The old quiet dot and its System / Light / Dark panel are switched off (commented out, files kept). `preferences.js` now drives the switch, with the old panel version kept at the bottom, commented out.

## 0.2.10 - 2026-10-20

- Beth & Kyle proposal: Ivan is VAT-registered, so the VAT line is back to "inclusive of VAT at 20%" and the total shows that £1,520 includes £253.33 VAT (ex-VAT £1,266.67).

## 0.2.9 - 2026-10-20

- Beth & Kyle proposal: travel wording clarified (50 miles from base included, then £0.45 per mile on the extra distance, return journey, overnight stays agreed in advance). VAT line now reads "No VAT is charged". Total £1,520.

## 0.2.8 - 2026-10-20

- Beth & Kyle proposal repriced to sit at the UK full-day average: Full Day Video Coverage £975, Feature Film Edit £545, Highlights Reel included, total £1,520. Add-on prices unchanged.

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
