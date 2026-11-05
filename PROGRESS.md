# Progress log

Claude Code: read this at the start of every session. Update it at the end of every phase.

## Current status
- Site: Haven Estates (Real Estate Website)
- Last completed phase: Phase 1
- Next phase: Phase 2
- Live URL: (owner fills in after the first Vercel deploy)

## Phase checklist
- [x] Phase 1: Scaffold, deploy and design system
- [ ] Phase 2: Home page
- [ ] Phase 3: Main feature pages
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

## Blockers
(Write anything that stopped you. Say exactly what the owner must do.)

## Notes for next session
(Short. Only what the next session needs to know.)
- Shared components in `src/components/`: Header, Footer, Logo, Button (`to`/`href`/button; variants primary, dark, outline, light; size sm), Img (`src`, `alt`, `ratio`, `eager`), Section (`tone` default/surface/dark, eyebrow, title, intro, action), PageTitle (`title`, `description`).
- Pages are placeholders using `components/Placeholder.jsx`; delete it once every page is built.
- Nav and contact data live in `src/data/site.js`.
