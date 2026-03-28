# Emiru Video Rentals

Web app for managing video rental clients, products, and schedules. Built with React, TypeScript, Vite, Tailwind CSS, and React Router.

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Getting started

```bash
cd emiru-video-rentals
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview   # optional: preview production build locally
```

## Routes

| Path         | Page        | Notes                                      |
| ------------ | ----------- | ------------------------------------------ |
| `/login`     | Login       | Branded glass login; submit goes to `/`    |
| `/`          | Members     | Client table                               |
| `/pending`   | Pending     | Clients with `paid === 0`                  |
| `/scheduled` | Scheduled   | Date range column in table                 |
| `/product`   | Product     | Inventory grid with quantity controls      |
| `/settings`  | Settings    |                                            |
| `/report`    | Report      |                                            |
| `*`          | Not found   |                                            |

## Login page

- **Component:** `src/pages/LoginPage.tsx`
- **Assets** (served from `public/`):

  - `public/login/emiru-logo.png` — logo
  - `public/login/login-bg-camera.png` — full-page background

- **Behavior:** Sign-in submits the form and navigates to `/`. Replace this with real authentication when you connect a backend.

## UI conventions

- **Host Grotesk** is loaded in `src/index.css` and used as the main font (see Tailwind `font-heading` / `font-body`).
- **Brand colors** use CSS variables such as `--emiru-yellow`, `--emiru-red`, `--emiru-black` (see `src/index.css` and `tailwind.config.ts` under `emiru.*`).

## Notable features

- **Sidebar — Custom mode:** Toggles editing of client **status** in `ClientTable` (dropdown when enabled). Preference is stored in `localStorage` key `emiru-custom-mode`.
- **Client table:** Search, status filter, pagination, add/edit/delete hooks; optional date range column for scheduled clients.
- **Product view:** Quantity adjustments with press-and-hold on +/- controls.

## Project structure (high level)

```
src/
  components/     # Shared UI (e.g. ClientTable, layout, modals)
  pages/          # Route-level screens (LoginPage, MembersPage, …)
  lib/            # Types and mock data
public/
  login/          # Login-specific static images
```

## License

Private / internal — add your license here if needed.
