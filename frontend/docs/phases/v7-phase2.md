# 📦 AssetFlow Frontend — Version 7 (Phase 2 Component Library)

## 🎯 Phase 2 Objectives
Construct the full modular component library (`cards`, `tables`, `dialogs`, `forms`, `calendar`, `overview`) for the **Booking & Reservation Management** module without developing business pages yet.

---

## 🧩 Components Created

### 1. Special Cards (`components/cards/`)
* **BookingCard**: Multi-resource reservation card displaying time bounds, status chip, requester details, and quick actions.
* **ReservationCard**: Compact card showing upcoming reservations.
* **ApprovalCard**: Manager card with quick Authorize/Decline actions.
* **BookingDetailCard**: Comprehensive deep-dive metadata display for inspection views.
* **BookingTimelineCard**: Chronological progression card for resource usage tracking.
* **ResourceSummaryCard**: Occupancy and capacity summary card.
* **BookingTimeline**: Graphical timeline representing start/end duration bars.
* **ConflictAlertCard**: Double-booking alert banner with override options.
* **QuickBookCard**: 1-click preset reservation shortcut card.

### 2. Specialized Tables (`components/tables/`)
* **BookingTable**: Main data table supporting status filtering, actions, and sorting.
* **ReservationTable**: Specialized table tracking upcoming checked-out resources.
* **ApprovalTable**: Manager workflow queue table with approval triggers.
* **BookingHistoryTable**: Immutable audit log table showing historical activity.
* **CalendarScheduleTable**: Hourly availability breakdown matrix across selected resources.

### 3. Interactive Modals (`components/dialogs/`)
* **CreateBookingDialog**: Complete validation-ready reservation modal with time selection and resource category mapping.
* **EditBookingDialog**: Modal for modifying time slots, notes, and attendees.
* **CancelBookingDialog**: Confirmation prompt requiring cancellation reasons.
* **BookingDetailsDialog**: Quick inspection modal.
* **ApprovalDialog**: Manager authorization sign-off modal.
* **RejectDialog**: Manager rejection modal with mandatory reason feedback.

### 4. Forms & Controls (`components/forms/` & `components/controls/`)
* **BookingForm / ReservationForm / ApprovalForm**: Reusable form sections.
* **Select (`@/components/forms/Select`)**: Reusable accessible select dropdown supporting both simple and object options.
* **BookingSearch / BookingFilter / StatusChip / PriorityIndicator**: Enterprise UI control widgets.

### 5. Multi-Resolution Calendar Suite (`components/calendar/`)
* **MonthlyCalendarView**: Grid layout for monthly occupancy tracking.
* **WeeklyCalendarView**: 7-day hourly grid with clickable reservation bars.
* **DailyCalendarView**: Granular hourly schedule timeline.
* **TimeSlotGrid**: Multi-resource side-by-side availability matrix.
* **CalendarLegend & AvailabilityIndicator**: Visual status indicators.

### 6. Overview & KPI Widgets (`components/overview/`)
* **BookingOverview / ReservationOverview / CalendarOverview**: Top-level KPI statistical banners.
* **QuickActionsPanel**: 1-click resource booking triggers.
* **PendingApprovals / UpcomingReservations / RecentBookings**: Dashboard overview panels.
* **AvailabilitySummary**: Real-time status list across all 5 resource categories.
* **BookingActivityTimeline / CalendarSummary**: Activity widgets.
