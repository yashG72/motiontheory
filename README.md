# MotionTheory website

React site for motiontheory.media (Vite + React + React Router).

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production files go to dist/
```

Upload the contents of `dist/` to your host. `public/_redirects` (Netlify) and
`vercel.json` (Vercel) send every URL to `index.html` so /about, /career and
/contact load directly.

## Where to edit

- `src/site.js`: emails, phone, studio address, social links and the optional form endpoint
- `src/pages/`: Home, About, Career (open roles live in the `JOBS` list), Contact
- `src/components/`: header, footer and shared pieces
- `src/styles.css`: all styling; colours and fonts are the tokens at the top
- `public/images/`: logo, wordmarks and favicon
