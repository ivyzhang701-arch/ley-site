# LEY — Luxury Services by Ivy

Signature Assignment Final Deliverable for the Northeastern web-development course (Canvas 3009991).

## Live site

Hosted via GitHub Pages at: <https://ivyzhang701-arch.github.io/ley-site/> (after push).

## Design language

Editorial-luxury direction informed by Aman, Aesop, The Row, and The Hoxton. Warm ivory paper over espresso ink with a single burnt-sienna accent. Typography pairs a variable serif display with a modern sans and mono, all licensed under OFL.

| Token            | Value                                                               |
| ---------------- | ------------------------------------------------------------------- |
| Display          | Fraunces (Google Fonts, OFL) — variable `opsz`, `wght`, `SOFT` axes |
| Body             | Geist (Vercel, OFL)                                                 |
| Label / Numerals | Geist Mono (tabular)                                                |
| Italic / accent  | Instrument Serif                                                    |
| Ink              | `oklch(20% 0.012 60)`                                               |
| Paper            | `oklch(94% 0.018 80)`                                               |
| Cream            | `oklch(89% 0.028 80)`                                               |
| Accent           | `oklch(55% 0.14 48)` (burnt sienna)                                 |

## Site structure

```
/
├── index.html        Home — full-bleed hero, index list of services, editorial split, pull quote, CTA
├── about.html        Founder story, three principles, timeline, quote
├── services.html     LEY's own services: ordered list of 5 categories with nested UL of hours
├── support.html      Local partners: ordered list of 6 categories (transportation, maintenance, cleaning, lessons, competitions, dining) with nested UL of hours
├── gallery.html      Editorial mosaic of privacy-safe photography (6 figures)
├── contact.html      JS-validated contact form (first-letter capitalisation, ZIP + email verification)
├── css/
│   ├── style.css         Tokens, layout, components (19 sections, commented)
│   └── responsive.css    1180 / 1100 / 900 / 720 / 480 breakpoints + reduced-motion
├── js/
│   ├── nav.js            Mobile nav, blur-on-scroll, active link, scroll-reveal, magnetic CTAs, footer year, progressive-enhancement flag
│   └── validation.js     Form validation — auto-capitalises first/last name + city; validates email, ZIP, phone, state, service, message, consent
├── images/
│   ├── favicon.svg
│   └── photo/            Licensed Unsplash editorial photography (hero, about, services, support, contact, 6× gallery)
├── media/                Reserved for future video
└── fonts/                Reserved for self-hosted woff2 (currently served via Google Fonts)
```

## Rubric mapping

| Rubric criterion                                                 | Where it is satisfied                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML5 structure + ≥ 5 semantic elements per page                 | Every page uses `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` / `<aside>` / `<figure>` / `<figcaption>`, `<footer>`, `<address>`, `<time>` — distinct counts range 7–9 per page                                                                |
| CSS for all formatting                                           | Two stylesheets (`style.css` + `responsive.css`). Zero inline styles for layout/color. All tokens in `:root`. Clear section comments                                                                                                                     |
| Contact form with JS validation                                  | `contact.html` + `js/validation.js`. Capitalises first/last name + city; validates ZIP (`NNNNN` or `NNNNN-NNNN`) and email; checks state, service, phone, message, consent                                                                               |
| Ordered list of categories with nested unordered lists for hours | `services.html` (5 categories) and `support.html` (6 categories matching the rubric's transportation/maintenance/cleaning/lessons/competitions/dining examples). Each `<ol class="service-list">` contains a `<ul class="service-list__hours">` per item |
| Image-styled lists                                               | `.service-list__hours li::before` renders a gold dot; `.partners li::before` uses an arrow glyph; rates use a hairline + mono rule                                                                                                                       |
| Responsive design                                                | `responsive.css` — 4 breakpoints + mobile hamburger + reduced-motion rule                                                                                                                                                                                |
| Banner + tab title per page                                      | Every page has a `.hero` or `.page-header` block and a unique `<title>`                                                                                                                                                                                  |
| Site structure folders                                           | `css/`, `js/`, `images/` (+ `images/photo/`), `media/`, `fonts/`                                                                                                                                                                                         |
| Consistent nav across pages                                      | Same six-link primary nav on every page; current page highlighted by `js/nav.js`; mobile drawer with animated hamburger                                                                                                                                  |
| Aesthetic theme                                                  | OKLCH ivory / espresso / burnt-sienna palette applied across all six pages; serif + sans pairing consistent                                                                                                                                              |
| Publishing                                                       | Repository mirrored at `ivyzhang701-arch/ley-site`; GitHub Pages enabled on `main`                                                                                                                                                                       |

## Running locally

```
cd 28042
python3 -m http.server 8080
```

Open <http://localhost:8080/>.

## Form validation notes

- **First / last name, city**: letters, spaces, hyphens, apostrophes only. Every word's first letter is auto-cased by JS. E.g. `o'brien` → `O'Brien`.
- **Email**: `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`, max 254 characters. Lower-cased on save.
- **ZIP**: `^\d{5}(-\d{4})?$` — accepts `02116` or `02116-1234`.
- **Phone**: optional, 7–15 digits with optional `+`, spaces, dashes, parens.
- **State, service**: required `<select>`.
- **Message**: 10 – 1000 characters with live counter in the hint.
- **Consent**: required checkbox.

On submit, missing or invalid fields get a red border, an inline error message, and the first invalid field is focused. On success, the form clears and shows a confirmation summary.

## Interactions

- Header goes frosted + compresses on scroll.
- Hero image performs a slow ken-burns zoom-in on load.
- Sections fade up as they enter the viewport (Intersection Observer). Reduced-motion users get instant reveals.
- Primary CTAs have a subtle magnetic hover on fine pointers.
- Nav link underlines sweep in from the centre.
- Gallery captions slide up only on hover / focus.
- Mobile hamburger animates into a × on open.

Progressive enhancement: if JS is disabled, the `js` class never lands on `<html>` and all content stays visible.
