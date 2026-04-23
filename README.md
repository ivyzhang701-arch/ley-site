# LEY — Luxury Services by Ivy

**ITC2400 Signature Assignment — Final Deliverable**

> **Live site:** <https://ivyzhang701-arch.github.io/ley-site/>
> Hosted via GitHub Pages on `main` branch, served from repository root.

A six-page responsive marketing site for LEY, a fictional Boston-based luxury lifestyle consultancy. Built from scratch in HTML5, modern CSS, and vanilla JavaScript with zero frameworks.

---

## Rubric coverage

| Rubric criterion (from the assignment)                                                                                                                         | How this site satisfies it                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTML5 Structures** — all pages built to the HTML5 standard, with at least five semantic elements on each page                                                | Every page uses the standard HTML5 document layout (`<!DOCTYPE html>`, `<html lang>`, `<head>` with meta + title, `<body>`). Distinct semantic elements per page range from **7 to 9**, drawn from `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<figcaption>`, `<footer>`, `<address>`, `<time>`. |
| **CSS Rules** — all formatting via CSS; size, placement, opacity, borders, repetition, animation controlled in CSS; organised with comments and separate files | Two stylesheets: [`css/style.css`](css/style.css) for tokens, layout, and components (19 commented sections, ~2,000 lines), and [`css/responsive.css`](css/responsive.css) for breakpoints + reduced-motion. No inline style attributes for layout or colour. All design tokens declared in `:root`.                                  |
| **Technical Functionality** — links, image links, navigation bars work; site navigation complete forward and backward                                          | The primary nav lists all six pages and is identical across pages. Active-page highlighting is driven by [`js/nav.js`](js/nav.js). Every internal link has been smoke-tested on the live GitHub Pages URL (13 resources checked, all HTTP 200).                                                                                       |
| **Aesthetically Appealing** — complete, balanced, complementary colour scheme across all pages                                                                 | Editorial palette in OKLCH colour space: ivory paper `oklch(94% 0.018 80)`, espresso ink `oklch(20% 0.012 60)`, single burnt-sienna accent `oklch(55% 0.14 48)`. Typography pairs Fraunces (serif display), Geist (sans body), Geist Mono (labels), and Instrument Serif (italic accent) — all Open Font License.                     |
| **Site Structure** — organised folders: images, stylesheet, media, fonts, etc.; HTML pages live in the root                                                    | Root contains the six HTML pages. Supporting folders: [`css/`](css/), [`js/`](js/), [`images/`](images/) (with `images/photo/` for editorial photography), [`media/`](media/), [`fonts/`](fonts/).                                                                                                                                    |
| **Site Publishing** — published to a web hosting service in addition to the Canvas zip                                                                         | Published via GitHub Pages: <https://ivyzhang701-arch.github.io/ley-site/>. The same files are also submitted to Canvas as a zip.                                                                                                                                                                                                     |

### Specific required features

| Requirement                                                                                                                                 | Implementation                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contact form with JS validation — uppercase first letters of first name, last name, city + ZIP and email validation                         | [`contact.html`](contact.html) + [`js/validation.js`](js/validation.js). Auto-capitalises every word's first letter in first name, last name, and city (e.g. `o'brien` becomes `O'Brien`). ZIP matches `^\d{5}(-\d{4})?$`. Email matches `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$` with length limit 254. Additional validation on state, service, phone, message length, and consent checkbox.                                                                             |
| Support services page — major categories as an ordered list with hours of operation as nested unordered lists; image-styled lists preferred | [`support.html`](support.html) presents six major categories (transportation, maintenance, cleaning, lessons, competitions, dining) as a single `<ol class="service-list">`. Each category contains a nested `<ul class="service-list__hours">` with dates and times. Lists are image-styled via CSS `::before` pseudo-elements (gold dot markers and arrow glyphs). A parallel `services.html` page uses the same pattern for LEY's own five service categories. |
| Responsive design                                                                                                                           | [`css/responsive.css`](css/responsive.css) defines four breakpoints (1180 / 1100 / 900 / 720 / 480 px), a mobile hamburger drawer, and a `prefers-reduced-motion` rule.                                                                                                                                                                                                                                                                                           |
| Banner on each page + descriptive browser tab title                                                                                         | Every page renders a `.hero` or `.page-header` banner block and declares a unique `<title>` (e.g. `Contact — LEY`, `Services & Rates — LEY`).                                                                                                                                                                                                                                                                                                                     |
| `index.html` as the homepage; other pages named for content                                                                                 | Homepage is [`index.html`](index.html). Content pages: [`about.html`](about.html), [`services.html`](services.html), [`support.html`](support.html), [`gallery.html`](gallery.html), [`contact.html`](contact.html).                                                                                                                                                                                                                                              |
| Consistent nav menu on every page, reaching all pages from any page                                                                         | Same six-link primary nav (Home, About, Services, Support, Gallery, Contact) appears in the `<header>` of every page. `js/nav.js` toggles the mobile drawer and highlights the current page.                                                                                                                                                                                                                                                                      |

---

## Site structure

```
/
├── index.html              Home — full-bleed hero, services index, editorial split, pull quote, CTA
├── about.html              Founder story, three principles, timeline, quote
├── services.html           LEY's own services: ordered list of 5 categories with nested UL of hours
├── support.html            Local partners: ordered list of 6 categories (transportation, maintenance,
│                           cleaning, lessons, competitions, dining) with nested UL of hours
├── gallery.html            Editorial mosaic of privacy-safe photography (6 figures)
├── contact.html            JS-validated contact form
├── css/
│   ├── style.css           Tokens, layout, components (19 sections, commented)
│   └── responsive.css      1180 / 1100 / 900 / 720 / 480 breakpoints + reduced-motion
├── js/
│   ├── nav.js              Mobile nav, blur-on-scroll, active link, scroll-reveal, magnetic CTAs
│   └── validation.js       Form validation + auto-capitalisation
├── images/
│   ├── favicon.svg
│   └── photo/              Editorial photography (hero, about, services, support, contact, 6 × gallery)
├── media/                  Reserved for video
└── fonts/                  Reserved for self-hosted woff2 (currently served via Google Fonts CDN)
```

---

## Running locally

Clone the repo, then serve the root with any static server:

```bash
git clone https://github.com/ivyzhang701-arch/ley-site.git
cd ley-site
python3 -m http.server 8080
```

Open <http://localhost:8080/>. A static server is required because the pages load JavaScript, CSS, and images via relative URLs — opening `index.html` directly from the file system works for most of the site but triggers browser security restrictions on some assets.

---

## Form validation — field-by-field

| Field                       | Rule                                                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| First name, last name, city | Letters, spaces, hyphens, apostrophes only. Every word's first letter is automatically capitalised on blur. |
| Email                       | `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`, max 254 characters, stored lowercase.                                      |
| ZIP                         | `^\d{5}(-\d{4})?$` — accepts `02116` or `02116-1234`.                                                       |
| Phone (optional)            | 7–15 digits with optional `+`, spaces, dashes, parentheses.                                                 |
| State, service              | Required `<select>` with placeholder option.                                                                |
| Message                     | 10 – 1,000 characters, live character counter.                                                              |
| Consent                     | Required checkbox.                                                                                          |

Missing or invalid fields receive a red border and an inline error message; the first invalid field is focused. A successful submission clears the form and renders a confirmation summary.

---

## Design language

Editorial-luxury direction informed by Aman, Aesop, The Row, and The Hoxton. Warm ivory paper over espresso ink with a single burnt-sienna accent.

| Token            | Value                                                               |
| ---------------- | ------------------------------------------------------------------- |
| Display          | Fraunces (Google Fonts, OFL) — variable `opsz`, `wght`, `SOFT` axes |
| Body             | Geist (Vercel, OFL)                                                 |
| Label / Numerals | Geist Mono (tabular)                                                |
| Italic / accent  | Instrument Serif                                                    |
| Ink              | `oklch(20% 0.012 60)`                                               |
| Paper            | `oklch(94% 0.018 80)`                                               |
| Cream            | `oklch(89% 0.028 80)`                                               |
| Accent           | `oklch(55% 0.14 48)`                                                |

### Interactions

- Header becomes frosted and compresses on scroll.
- Hero image plays a slow ken-burns zoom-in on load.
- Sections fade up as they enter the viewport (IntersectionObserver). `prefers-reduced-motion` users receive instant reveals.
- Primary call-to-action buttons have a subtle magnetic hover on fine-pointer devices.
- Nav link underlines sweep in from the centre.
- Gallery captions slide up only on hover or keyboard focus.
- Mobile hamburger animates into a × when open.

Progressive enhancement: if JavaScript is disabled, the `js` class is never added to `<html>` and all content remains visible.

---

## Submission

- **Canvas:** `ley-signature-assignment.zip` uploaded to the Signature Assignment Final Deliverable page.
- **Web hosting:** <https://ivyzhang701-arch.github.io/ley-site/>
- **Source:** <https://github.com/ivyzhang701-arch/ley-site>
