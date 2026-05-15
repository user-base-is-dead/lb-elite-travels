# LB Elite Travels — Frontend

Pure React + Vite + plain CSS. No Tailwind, no TypeScript.

## Run
```bash
cd frontend
npm install
npm run dev
```

## Structure
- `src/components/` — shared (Header, Footer, Loader, CustomCursor, ParticleField, SmoothScroll)
- `src/pages/` — Home, About, Destinations, Services, Contact (each with its own sub-components)
- `src/hooks/` — useDeviceDetect, useScrollAnimation
- `src/utils/` — performanceUtils
- `src/styles/variables.css` — design tokens
- `public/images/` — all imagery
