# AssetFlow - Version 1 Phase 1

## Overview
This phase establishes the foundational frontend architecture for the AssetFlow Enterprise ERP application. 

No business modules, authentications, or specific pages (like dashboards or asset lists) are built in this phase. The sole purpose is to create a robust, scalable, and production-ready React + Vite boilerplate that adheres strictly to the Odoo Hackathon 2026 guidelines.

## Architecture & Configuration

*   **Tech Stack:** React, Vite, Tailwind CSS V4, React Router DOM, Axios, TanStack Query, React Hook Form, Zod, Framer Motion, Lucide React, Chart.js.
*   **Routing (`src/routes`):** Configured with `react-router-dom` using `createBrowserRouter`. Separated into `AuthLayout` and `MainLayout`, guarded by a `ProtectedRoute` component.
*   **State & API (`src/services`, `src/App.jsx`):** Setup `@tanstack/react-query` for server state and caching. Created a centralized Axios instance (`api.js`) with request/response interceptors to handle future JWT tokens.
*   **Styling (`src/styles`):** Implemented Tailwind V4 natively with Vite. Defined global CSS variables (`--color-primary-*`, `--color-sidebar-*`) to enforce a premium, minimal ERP aesthetic.
*   **Feedback (`src/components/feedback`):** Implemented a global `ErrorBoundary` and a reusable `LoadingScreen` component.
*   **Aliases:** Configured `@` to point to `src/` via `vite.config.js` and `jsconfig.json`.

## Folder Structure Established
```text
src/
├── assets/                  # Static assets
├── components/              
│   ├── charts/              # Chart.js wrappers
│   ├── common/              # Generic reusable components
│   ├── feedback/            # LoadingScreen, ErrorBoundary
│   ├── forms/               # React Hook Form wrappers
│   ├── layout/              # Header, Sidebar
│   ├── navigation/          # ProtectedRoute, menus
│   ├── tables/              # Data tables
│   └── ui/                  # Buttons, Cards, Modals
├── config/                  # App configurations
├── constants/               # API Base URL, Roles
├── context/                 # Global Context (Auth, Theme)
├── hooks/                   # Custom reusable hooks
├── layouts/                 # MainLayout, AuthLayout
├── pages/                   # Route-level pages
├── routes/                  # index.jsx, routes.js
├── services/                # api.js
├── styles/                  # global.css
├── types/                   # Type definitions
└── utils/                   # Helper functions
```

## Git Workflow Reminder
Frontend development happens **only** inside the `/frontend` directory. 
Always run `git pull origin main` to sync backend changes before pushing frontend work.
