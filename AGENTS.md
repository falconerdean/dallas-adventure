# AGENTS.md

## Cursor Cloud specific instructions

This is a single-page React app ("dallas-adventure") built with Vite. There is no backend, database, or external API.

### Services

| Service | Command | Notes |
|---|---|---|
| Vite dev server | `npm run dev` | Serves the SPA with HMR on port 5173 |

### Key commands

- **Install deps:** `npm install` (lockfile is `package-lock.json`)
- **Lint:** `npm run lint` — pre-existing lint errors exist (React purity warnings for `Math.random()` in render, and an unused variable). These are not regressions.
- **Build:** `npm run build` — outputs to `dist/`
- **Dev server:** `npm run dev` (add `-- --host 0.0.0.0` to expose on all interfaces)
- **Preview prod build:** `npm run preview`

### Testing notes

- There are no automated tests in this project.
- To manually test all features (time-gated cards), use the `?admin=true` query parameter to bypass time gates.
- The app uses `localStorage` for state persistence; clear it or use incognito for a fresh start.
