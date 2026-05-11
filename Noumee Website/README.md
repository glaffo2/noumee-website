# Noumee Website Knowledge Base

## Project Location

`C:\Users\glaff\Documents\Codex\Noumee Website`

This folder contains the current static Noumee website prototype:

- `index.html` - page structure and content
- `styles.css` - visual system, responsive layout, animations styling
- `script.js` - Lenis, GSAP ScrollTrigger, pricing toggle, card animations
- `assets/` - logos, hero images, card images, product imagery
- `tools/` - image optimization utilities

## Brand Direction

Noumee is a global digital business card brand for freelancers, students, creators, young professionals, and modern teams.

The website should feel:

- easygoing, fresh, social, and community-oriented
- modern/editorial rather than tech-heavy
- friendly and visual, not corporate SaaS
- design-forward without becoming too neo-brutalist

The technology should stay behind the experience. The message is about being remembered, sharing yourself naturally, and making better first impressions.

## Core Message

Current hero line:

`One tap. All you.`

Useful positioning language:

- Meet people. Tap once. Stay remembered.
- From hello to saved.
- Built for motion.
- No awkward follow-up.
- Share your profile in the way that fits the moment.

## Current Sections

### 1. Hero

Full-bleed photo with:

- pill navbar
- Noumee icon in nav
- giant Noumee wordmark over the image
- large punchline at the bottom

Current desktop hero image:

- `assets-optimized/hero-banner-noumee-people-showing-profiles-and-cards-2.webp`
- Source original: `assets/hero-banner-noumee-people-showing-profiles-and-cards-2.jpg`
- Mobile-specific hero image is still pending and should be wired separately when available.
- No grey/dark overlay should be applied to the hero banner; `.hero-shade` is intentionally transparent for this white-background image.

Mobile note: the hero logo is constrained to the viewport width so it does not bleed outside the screen.

### 2. Stacked Scroll Cards

Three GSAP/ScrollTrigger cards:

1. `From hello to saved.`
   - yellow background
   - party tap image
   - Discover button

2. `Built for motion.`
   - green `#5ef485`
   - image: `assets-optimized/built-for-motion-profile-card.webp`
   - source original: `assets/built-for-motion-profile-card.png`
   - Get your free profile button

3. `No awkward follow-up.`
   - orange `#f4a55e`
   - NFC card/profile product image

Desktop uses pinned/rotating cards. Mobile uses a safer scroll effect instead of desktop pinning.

### 3. Editorial Statement

Centered Happly-inspired text section:

`Noumee [wordmark] blends visual impact with sustainability. Choose from a growing library of unique templates [image chip] and make every first impression count.`

Typography target:

- Rethink Sans
- color `rgb(28, 28, 28)`
- desktop cap around `60px`
- centered layout

### 4. 3 Ways To Connect

Split-card scroll section based on `CODE (4).zip`.

Methods:

1. Tap your card
2. Let them scan your QR code
3. Add your QR code to Google Wallet

Desktop behavior:

- cards begin as a connected split image
- spread apart while scrolling
- flip to reveal method copy and Discover buttons

Current front image order:

- left: `noumee-banner-girl-looking-at-her-cellphone-1`
- middle: `noumee-banner-girl-looking-at-her-cellphone-2`
- right: `noumee-banner-girl-looking-at-her-cellphone-3`

Mobile status: the desktop flip effect is replaced with compact image-plus-copy method cards so the section stays readable on small screens.

### 5. Pricing

Pricing section includes:

- Free
- One
- Plus
- Elite

Detailed final pricing/spec source of truth:

`PRICING-SPECS.md`

Includes monthly/yearly toggle.

Current prices:

| Plan | Card | Monthly | Yearly | Profiles |
| --- | --- | --- | --- | --- |
| Free | No physical card | EUR 0 | EUR 0 | 1 |
| One | EUR 19 NFC card | EUR 1.90 | EUR 19 | 1 |
| Plus | EUR 29 NFC card | EUR 4.90 | EUR 39 | 1 |
| Elite | EUR 29 NFC card | EUR 9.90 | EUR 79 | 3 |

Feature notes:

- Free: dynamic QR, limited editing
- One: dynamic QR, free editing, template choice, lead capture, PVC card, no customization, AI Avatar 1 gen/month in Pixar style
- Plus: One plus advanced analytics, customizable metallic physical card, and AI Avatar 3 gen/month in Pixar style
- Elite: Plus plus 3 profiles, verified badge, customizable metallic physical card, and AI Avatar 10 gen/month in all styles
- All paid plans include PWA install, vCard download, and NFC tap sharing

Recent final pricing decisions:

- Keep the website's existing light Noumee pricing design; do not copy the dark mockup style from the reference image.
- Default billing state is yearly.
- Yearly mode shows only the yearly price and `/ year`; do not show average monthly equivalents on the live pricing cards.
- Average monthly equivalents may remain in `PRICING-SPECS.md` only as internal reference.
- The One plan is `EUR 19 / year` and `EUR 1.90 / month`.
- The Plus plan is `EUR 39 / year` and `EUR 4.90 / month`.
- The Elite plan is `EUR 79 / year` and `EUR 9.90 / month`.
- The Free card should not list removed negatives like no template choice, no lead capture, no analytics, or AI Avatar unavailable.
- The One card should not list no analytics.
- Card material/customization belongs in the feature list, not only in the small card-fee line.
- One card feature wording: `PVC card` plus muted `No customization`.
- Plus and Elite card feature wording: `Customizable metallic physical card`.
- Plus and Elite physical cards cost more because they are customizable metallic cards; the card fee line should stay simple as `Card: EUR 29 one-time`.
- Plus keeps the `Most popular` badge, but the badge is absolutely positioned so the plan title and price stay aligned with the other plans.
- Elite uses purple accent `#6850a1` so it is visually distinct from Plus.
- Each plan box has a `2px` border.
- Plus keeps a lighter featured background; avoid making the featured card feel too heavy.
- Pricing font was reduced from the original large size and should stay compact enough for the four-card grid.

## Design Notes

Avoid pushing the site too far into neo-brutalism.

Preferred direction:

- modern, rounded, tactile
- editorial text rhythm
- warm photography
- soft shadows rather than chunky hard shadows
- clean buttons with subtle hover movement
- large typography but controlled on mobile
- main content image frames use a `20px` border radius

## Animation Stack

Current libraries loaded via CDN:

- Lenis
- GSAP
- ScrollTrigger

Main animation file:

`script.js`

Important behavior:

- Lenis smooth scroll is shorter on mobile
- stacked cards use GSAP ScrollTrigger
- connect cards initialize after `window.load` so images are measured correctly
- pricing toggle swaps `data-monthly` / `data-yearly` values

## Image Optimization

Current status: WebP copies have been generated in `assets-optimized/` and `index.html` / `styles.css` now point to optimized WebP files for the live page imagery. Original assets remain in `assets/`.

A local WebP conversion tool exists in:

`tools/optimize-images.py`

Setup:

```powershell
python -m pip install -r tools/requirements.txt
```

Run:

```powershell
python tools/optimize-images.py --input assets --output assets-optimized --quality 82 --max-width 1920 --overwrite
```

Originals are not modified.

## Video Popup Plan

Current status: each `Discover` button in the `3 ways to connect` section opens a reusable popup/modal shell. The modal currently uses a branded preview frame and method-specific copy until final video assets are available.

Recommended behavior:

- modal opens on card button click - implemented
- ESC closes modal - implemented by native dialog behavior
- backdrop click closes modal - implemented
- close button visible on desktop/mobile - implemented
- pause video on close - implemented for future `video` elements
- video autoplays muted or shows play controls depending on final UX - pending real video assets
- mobile layout full-screen or near full-screen - modal stacks into a compact mobile layout

Potential modal content:

1. Tap your card - NFC tap demo
2. Scan QR code - QR scan demo
3. Google Wallet - adding/opening QR from wallet

## Local Preview

Current local server used during development:

`http://127.0.0.1:4173/index.html`

If it is not running, start a simple server from the project folder:

```powershell
cd "C:\Users\glaff\Documents\Codex\Noumee Website"
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

`http://127.0.0.1:4173/index.html`

## Next Useful Tasks

- Resume point from May 11, 2026: desktop hero is the `-2` WebP banner, hero overlay is intentionally transparent, Built for motion uses `built-for-motion-profile-card.webp`, and main content image frames use `20px` radius. Local preview was being served from `http://127.0.0.1:4173/index.html`.
- Add final video assets to the three connection-method modal previews
- Replace placeholder pricing links with real destinations
- Final pass on pricing copy/links once real checkout or signup destinations exist
- Consider converting the static site to Vite or Next.js before deployment
