# L'Atelier — perfume showroom

React + Vite frontend. No backend, no database — products live in
`src/data/products.js` as a plain array.

## Run it

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Before going live

1. `src/data/products.js` — swap in the real brand name and WhatsApp number
   (`whatsappNumber`, digits only, country code first, no `+` or spaces),
   and replace the sample products with the real ones.
2. Swap the placeholder bottle line-art for real product photos once
   available (in `ProductCard.jsx` and `Hero.jsx`).
3. Deploy for free on Vercel, Netlify, or GitHub Pages — all have zero-cost
   tiers that comfortably fit a static showroom like this.

## Adding a backend later

Right now `products.js` is a static array. If the collection grows past
10-15 pieces, or she wants to update it herself without you touching code,
that file is the only thing that needs to change — swap the array for a
fetch call to an API and every component keeps working as-is.
