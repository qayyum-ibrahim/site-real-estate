# Haven Estates

A demo website for a fictional property agency in Lagos and Abuja. Front end only: no backend, no real payments, no real enquiries. Forms validate in the browser and show a success message.

Built with Vite, React, React Router and plain CSS. Hosted on Vercel.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Add the real photos

Put JPG files in `public/images/` with these exact names. Until a file exists, the site shows a branded green placeholder in its place.

| File | Used for |
| --- | --- |
| `hero.jpg` | Home page hero |
| `property-1.jpg` to `property-12.jpg` | The 12 listings, in the order of `src/data/properties.js` (also reused for area tiles and the About page) |
| `agent-1.jpg` to `agent-3.jpg` | Adaeze Okafor, Tunde Bakare, Hauwa Musa |

Prompts for each image are in `IMAGE-PROMPTS.md`. Keep each file under about 400 KB.

## Edit the content

All copy and data live in `src/data/`:

- `site.js`: name, tagline, email, phone, offices, navigation
- `properties.js`: the 12 listings (price, beds, baths, size, features, agent)
- `agents.js`: the three agents
- `home.js`: hero, popular areas, why choose us
- `listings.js`: filter options and price steps
- `detail.js`: property page labels, gallery views, mortgage defaults
- `about.js`: story, stats, values, steps
- `contact.js`: offices, hours, FAQs, form topics, 404 copy

Colors, fonts and spacing are in `src/styles/tokens.css`.

## Notes

- Favourites are saved in the browser (`localStorage`, key `haven:favourites`).
- Listings filters live in the URL, so a search can be shared.
- Demo project. This is not a real business.
