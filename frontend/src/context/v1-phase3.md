# AssetFlow - Version 1 Phase 3

## Overview
This phase establishes the complete, production-ready enterprise ERP layout system for AssetFlow. 
No business modules or functional pages (such as live dashboards or asset management tables) were created in this phase. The sole purpose was to construct a robust, highly responsive, and modular layout framework modeled after leading enterprise platforms like Odoo, SAP, and Oracle.

## Architecture & Layout Components Built

All layout components reside cleanly within `src/components/layout/` and are united inside `src/layouts/MainLayout.jsx`:

### `src/components/layout/`
*   `Sidebar.jsx`: Persistent Desktop & Collapsible navigation sidebar (`hidden md:flex`). Features a collapse toggle (`w-64` to `w-20`), persists state across sessions via `localStorage`, and includes hover tooltips for condensed mode across 12 ERP module placeholders.
*   `MobileSidebar.jsx`: Off-canvas navigation drawer powered by `framer-motion`. Slides from the left (`x: -100%` to `0`) on mobile/tablet breakpoints (`< md`), accompanied by an animated backdrop blur.
*   `Navbar.jsx`: Sticky top navigation bar (`h-16 z-30 sticky top-0`). Contains the mobile drawer trigger button, brand identity on small screens, a global search input with keyboard shortcut badges (`Cmd+K`), theme toggle placeholder (`Sun` / `Moon`), notification bell, and user profile dropdown.
*   `NotificationBell.jsx`: Interactive notification trigger with an unread badge counter (`ring-2 ring-white`). Opens an animated Framer Motion popover displaying categorized placeholder alerts (Overdue returns, Maintenance approvals, Booking reminders).
*   `ProfileDropdown.jsx`: Accessible profile menu with `click-outside` closure. Displays user avatar, name, and role (`Asset Manager`). Provides placeholder links for Profile, Preferences, and Sign Out.
*   `PageHeader.jsx`: Standardized header for all future feature modules. Renders page title, optional subtitle, integrated `Breadcrumb` navigation, and a flexible right-aligned `actions` slot for primary/secondary module buttons.
*   `MainContentWrapper.jsx`: Main scrollable viewport container (`flex-1 overflow-y-auto`). Enforces uniform enterprise padding (`p-4 sm:p-6 lg:p-8`) and supports configurable max-width containers.
*   `DashboardContainer.jsx`: Modular layout helper providing standardized grids (`DashboardContainer.MetricsGrid`), split two-column views (`DashboardContainer.SplitSection`), and titled sections (`DashboardContainer.Section`) for future analytics and KPI cards.
*   `Footer.jsx`: Enterprise system status footer showing operational health indicator (`animate-ping`), copyright, and documentation links.

### `src/layouts/`
*   `MainLayout.jsx`: Master wrapper uniting `Sidebar`, `MobileSidebar`, `Navbar`, `MainContentWrapper`, and `Footer`. Manages collapsible and mobile menu state seamlessly.

## Folder Structure Established
```text
frontend/src/
├── assets/
├── components/
│   ├── feedback/       # EmptyState, ErrorBoundary, Loader, LoadingScreen, SkeletonLoader, Toast
│   ├── forms/          # FilterPanel, Input, SearchBar
│   ├── layout/         # DashboardContainer, Footer, MainContentWrapper, MobileSidebar, Navbar, NotificationBell, PageHeader, ProfileDropdown, Sidebar
│   ├── navigation/     # Breadcrumb, ProtectedRoute
│   ├── tables/         # Table, Pagination
│   └── ui/             # Avatar, Button, Card, Modal, StatusBadge
├── constants/
├── context/            # v1-phase1.md, v2-phase2.md, v1-phase3.md
├── layouts/            # AuthLayout, MainLayout
├── pages/              # NotFound
├── routes/             # index.jsx, routes.js
└── services/           # api.js
```

## Git Workflow & Next Steps
Phase 3 layout framework is fully compiled and tested with `@tailwindcss/vite`.
Ready to begin Phase 4 (Functional Module Pages / Authentication UI) upon user request.
