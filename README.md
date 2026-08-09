# THE DATA BUILDER — AWS Data Engineer course site

Vite + React + Tailwind CSS. Icons via `lucide-react`.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

- `src/App.jsx` — the entire page, built from composable sections
  (Navbar, Hero, WhyChooseUs, CourseOverview, Curriculum, Capstone,
  Projects, LearningJourney, CareerSupport, InterviewPrep, Benefits,
  WhoIsThisFor, TechStackWall, Testimonials, FAQ, EnrollmentForm,
  FinalCTA, Footer).
- `src/index.css` — Tailwind directives.
- `tailwind.config.js` / `postcss.config.js` — Tailwind build setup.

## Notes

- Fonts (Space Grotesk / Inter / JetBrains Mono) load via a Google
  Fonts `@import` inside `App.jsx` — for production you may want to
  self-host them instead for performance.
- The enrollment form currently just flips to a "request received"
  state on submit; wire it up to your actual lead endpoint (email,
  CRM, Sheets, etc.) before going live.
- Testimonials are placeholders — swap in real student quotes/photos
  in the `TESTIMONIALS` array.
