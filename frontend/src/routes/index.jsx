import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from '@/components/navigation/ProtectedRoute';
import GuestRoute from '@/components/navigation/GuestRoute';
import NotFound from '@/pages/NotFound';

// Auth Pages (Static Imports for core flow)
import Login from '@/features/auth/pages/Login';
import ForgotPassword from '@/features/auth/pages/ForgotPassword';
import ResetPassword from '@/features/auth/pages/ResetPassword';
import Unauthorized from '@/features/auth/pages/Unauthorized';
import SessionExpired from '@/features/auth/pages/SessionExpired';

// ----------------------------------------------------------------------
// Lazy Loaded Route Components (V12 Performance Optimization)
// ----------------------------------------------------------------------
const DashboardHome = lazy(() => import('@/features/dashboard/pages/DashboardHome'));

// Organization
const OrganizationDashboard = lazy(() => import('@/features/organization/pages/OrganizationDashboard'));
const OrganizationsList = lazy(() => import('@/features/organization/pages/OrganizationsList'));
const DepartmentsList = lazy(() => import('@/features/organization/pages/DepartmentsList'));
const BranchesList = lazy(() => import('@/features/organization/pages/BranchesList'));
const TeamsList = lazy(() => import('@/features/organization/pages/TeamsList'));

// Assets & Allocations
const AssetDashboard = lazy(() => import('@/features/assets/pages/AssetDashboard'));
const AllocationDashboard = lazy(() => import('@/features/allocation/pages/AllocationDashboard'));

// Booking
const BookingDashboardPage = lazy(() => import('@/features/booking/pages/BookingDashboardPage'));
const MeetingRoomBookingPage = lazy(() => import('@/features/booking/pages/MeetingRoomBookingPage'));
const VehicleBookingPage = lazy(() => import('@/features/booking/pages/VehicleBookingPage'));
const EquipmentBookingPage = lazy(() => import('@/features/booking/pages/EquipmentBookingPage'));
const WorkspaceBookingPage = lazy(() => import('@/features/booking/pages/WorkspaceBookingPage'));
const LabBookingPage = lazy(() => import('@/features/booking/pages/LabBookingPage'));
const BookingCalendarPage = lazy(() => import('@/features/booking/pages/BookingCalendarPage'));
const BookingHistoryPage = lazy(() => import('@/features/booking/pages/BookingHistoryPage'));
const BookingDetailPage = lazy(() => import('@/features/booking/pages/BookingDetailPage'));
const ApprovalPage = lazy(() => import('@/features/booking/pages/ApprovalPage'));

// Maintenance & Reports
const MaintenanceDashboard = lazy(() => import('@/features/maintenance/pages/MaintenanceDashboard'));
const AnalyticsDashboard = lazy(() => import('@/features/reports/pages/AnalyticsDashboard'));

// Notifications & Settings
const AllNotifications = lazy(() => import('@/features/notifications/pages/AllNotifications'));
const AccountSettings = lazy(() => import('@/features/settings/pages/AccountSettings'));

// Global Suspense Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-full w-full p-12">
    <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.LOGIN, element: <Login /> },
          { path: '/forgot-password', element: <ForgotPassword /> },
          { path: '/reset-password', element: <ResetPassword /> },
          { path: '/session-expired', element: <SessionExpired /> }
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <Suspense fallback={<PageLoader />}><DashboardHome /></Suspense>,
          },
          // Organization
          { path: ROUTES.ORGANIZATION, element: <Suspense fallback={<PageLoader />}><OrganizationDashboard /></Suspense> },
          { path: ROUTES.ORGANIZATION_LIST, element: <Suspense fallback={<PageLoader />}><OrganizationsList /></Suspense> },
          { path: ROUTES.DEPARTMENTS, element: <Suspense fallback={<PageLoader />}><DepartmentsList /></Suspense> },
          { path: ROUTES.BRANCHES, element: <Suspense fallback={<PageLoader />}><BranchesList /></Suspense> },
          { path: ROUTES.TEAMS, element: <Suspense fallback={<PageLoader />}><TeamsList /></Suspense> },
          
          // Assets & Allocation
          { path: ROUTES.ASSETS, element: <Suspense fallback={<PageLoader />}><AssetDashboard /></Suspense> },
          { path: '/allocation', element: <Suspense fallback={<PageLoader />}><AllocationDashboard /></Suspense> },
          { path: '/transfer', element: <Suspense fallback={<PageLoader />}><AllocationDashboard /></Suspense> },
          
          // Booking
          { path: ROUTES.BOOKING_DASHBOARD, element: <Suspense fallback={<PageLoader />}><BookingDashboardPage /></Suspense> },
          { path: ROUTES.BOOKING_MEETING_ROOMS, element: <Suspense fallback={<PageLoader />}><MeetingRoomBookingPage /></Suspense> },
          { path: ROUTES.BOOKING_VEHICLES, element: <Suspense fallback={<PageLoader />}><VehicleBookingPage /></Suspense> },
          { path: ROUTES.BOOKING_EQUIPMENT, element: <Suspense fallback={<PageLoader />}><EquipmentBookingPage /></Suspense> },
          { path: ROUTES.BOOKING_WORKSPACES, element: <Suspense fallback={<PageLoader />}><WorkspaceBookingPage /></Suspense> },
          { path: ROUTES.BOOKING_LABS, element: <Suspense fallback={<PageLoader />}><LabBookingPage /></Suspense> },
          { path: ROUTES.BOOKING_CALENDAR, element: <Suspense fallback={<PageLoader />}><BookingCalendarPage /></Suspense> },
          { path: ROUTES.BOOKING_HISTORY, element: <Suspense fallback={<PageLoader />}><BookingHistoryPage /></Suspense> },
          { path: ROUTES.BOOKING_DETAILS, element: <Suspense fallback={<PageLoader />}><BookingDetailPage /></Suspense> },
          { path: ROUTES.BOOKING_APPROVALS, element: <Suspense fallback={<PageLoader />}><ApprovalPage /></Suspense> },

          // New Modules (V8-V11)
          { path: ROUTES.MAINTENANCE, element: <Suspense fallback={<PageLoader />}><MaintenanceDashboard /></Suspense> },
          { path: ROUTES.REPORTS, element: <Suspense fallback={<PageLoader />}><AnalyticsDashboard /></Suspense> },
          { path: ROUTES.NOTIFICATIONS, element: <Suspense fallback={<PageLoader />}><AllNotifications /></Suspense> },
          { path: ROUTES.PROFILE, element: <Suspense fallback={<PageLoader />}><AccountSettings /></Suspense> },
          { path: ROUTES.SETTINGS, element: <Suspense fallback={<PageLoader />}><AccountSettings /></Suspense> },
        ],
      },
    ],
  },
  {
    path: '/unauthorized',
    element: <AuthLayout><Unauthorized /></AuthLayout>,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
]);
