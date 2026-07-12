# AssetFlow - Phase 2

## Overview
This phase focused strictly on building the reusable design system for the AssetFlow ERP frontend. 
No pages or business logic were implemented. The goal was to establish a premium, unified set of React components using Tailwind CSS V4, Lucide React icons, and Framer Motion for animations.

## Architecture & Configuration
*   **Component Modularity:** All components are designed as independent, reusable pieces without hardcoded business logic.
*   **Design Language:** Enforced enterprise ERP aesthetics (minimal, clean typography, standardized spacing) suitable for applications like Odoo, SAP, or Oracle.

## Folder Structure & Components Built

### `src/components/ui/`
*   `Button.jsx`: Supports multiple variants (primary, secondary, danger, ghost), sizes, loading states, and icons.
*   `Card.jsx`: Compound component featuring `Card.Header`, `Card.Body`, and `Card.Footer` for structural consistency.
*   `Modal.jsx`: Animated with Framer Motion, supports sizing options, accessible overlay, and click-outside closure.
*   `StatusBadge.jsx`: Color-coded badge mapped to predefined ERP status values (Available, Allocated, Under Maintenance, etc.).
*   `Avatar.jsx`: Renders user images or auto-generates initials with a fallback icon.

### `src/components/forms/`
*   `Input.jsx`: Wrapped with `forwardRef` for React Hook Form compatibility, supports icons and inline error messages.
*   `SearchBar.jsx`: Includes built-in debouncing (default 300ms) to optimize API queries.
*   `FilterPanel.jsx`: Standardized wrapper for rendering complex filter sets with 'Clear' and 'Apply' actions.

### `src/components/tables/`
*   `Table.jsx`: Full-width data table with support for custom cell renderers, row click actions, and empty/loading states.
*   `Pagination.jsx`: Component for handling large datasets with visual page numbers, previous/next controls, and metadata display.

### `src/components/navigation/`
*   `Breadcrumb.jsx`: Semantic navigation path component.

### `src/components/feedback/`
*   `EmptyState.jsx`: Standardized view for lists or tables with no data.
*   `Toast.jsx`: Auto-closing notification component (success, error, warning, info) animated with Framer Motion.
*   `SkeletonLoader.jsx`: Pulse animation blocks configurable by type (text, title, avatar, card) for loading states.
*   `Loader.jsx`: Standard inline spinner.

## Git Workflow Reminder
*   Development remains strictly within the `/frontend` directory.
*   Components are ready to be integrated into full pages in the upcoming phases.
