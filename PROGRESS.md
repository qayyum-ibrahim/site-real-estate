# Progress log

Claude Code: read this at the start of every session. Update it at the end of every phase.

## Current status
- Site: Haven Estates (Real Estate Website)
- Last completed phase: Phase 3
- Next phase: Phase 4
- Live URL: (owner fills in after the first Vercel deploy)

## Phase checklist
- [x] Phase 1: Scaffold, deploy and design system
- [x] Phase 2: Home page
- [x] Phase 3: Main feature pages
- [ ] Phase 4: Remaining pages
- [ ] Phase 5: Polish and hand-off

## Decisions
(Write each choice you made without asking. One line each, with the phase number.)
- P1: Page split. Phase 2 = Home. Phase 3 = Listings (`/properties`) and Property detail (`/properties/:id`) with filters, sort, favourites and mortgage calculator. Phase 4 = About (`/about`) and Contact (`/contact`), plus not-found page.
- P1: Scaffolded with `npm create vite@latest` (React, JS: Vite 8, React 19, oxlint) in a temp folder and copied in, so instruction files were not touched.
- P1: Fonts: DM Serif Display 400 (headings), Manrope 400/500/600/700 (body).
- P1: Fictional contact: hello@havenestates.example, +234 800 000 0000, offices on Admiralty Way (Lekki) and Aminu Kano Crescent (Wuse 2).
- P1: Header CTA "Book a viewing" links to Contact. Mobile menu below 900px, closes on Escape, route change and resize.
- P1: Img fallback is a dark green gradient with a fine diagonal pattern and a house outline.
- P2: All 12 properties written to `src/data/properties.js` now (prices in naira, rent per year, size in m², `listed` date for "newest" sort). Types: Apartment, Duplex, House, Penthouse. Yaba studio has `beds: 0` (shown as "Studio").
- P2: Agents: Adaeze Okafor (agent-1), Tunde Bakare (agent-2), Hauwa Musa (agent-3), phones +234 800 000 0001 to 0003, `@havenestates.example`.
- P2: Featured on Home = properties with `featured: true` (6). Popular areas reuse the matching property photo as their tile image.
- P2: Hero copy points ("Every listing visited in person", "No viewing fees", "Agents in both cities") and Why Haven copy are fictional, in `src/data/home.js`.
- P3: Listings filters live in the URL (`mode`, `location`, `type`, `min`, `max`, `beds`, `saved`, `sort`) so searches can be shared. Price steps change with buy/rent (`src/data/listings.js`). Bedrooms filter is "N+ beds". Added a "Location" filter so Home search/area links work.
- P3: Favourites stored under localStorage key `haven:favourites`, shared via `useSyncExternalStore` (`src/hooks/useFavourites.js`). "Saved" toggle on Listings shows only saved homes.
- P3: Only one photo per property exists, so the detail gallery shows 3 views of it: full shot plus two zoomed crops (`galleryViews` in `src/data/detail.js`).
- P3: Mortgage calculator shows only on "for sale" listings. Defaults: 30% deposit, 20 years, 18% rate (fictional guide).
- P3: Enquiry form (name, email, optional phone, prefilled message) validates on the front end and shows a success note that says nothing was sent.

## Blockers
(Write anything that stopped you. Say exactly what the owner must do.)

## Notes for next session
(Short. Only what the next session needs to know.)
- Shared components in `src/components/`: Header, Footer, Logo, Button (`to`/`href`/button; variants primary, dark, outline, light; size sm), Img (`src`, `alt`, `ratio`, `eager`), Section (`tone` default/surface/dark, eyebrow, title, intro, action), PageTitle (`title`, `description`).
- About and Contact still use `components/Placeholder.jsx`; delete it in Phase 4 once they are built.
- Shared form styles in `src/styles/forms.css` (`.field`, `.input`, `.select`, `.textarea`, `.field--error`, `.field__error`). Reuse them and copy the validation pattern from `components/EnquiryForm.jsx` for the Contact form.
- Headless Chrome screenshots below ~500px wide are cropped by Chrome itself, not by the layout.
- Nav and contact data live in `src/data/site.js`.
- Hero search and area tiles link to `/properties?mode=buy|rent&location=<city or area>&type=<type>`. Phase 3 Listings must read these query params (location matches `city` or `area`).
- New shared pieces: `PropertyCard` (no favourite button yet, add it in Phase 3), `Icon` (inline SVG set), `Reveal` (scroll fade-in), `utils/format.js` (formatNaira, formatPrice, formatBeds, telHref). `Img` accepts `ratio={null}` to fill a positioned parent.
