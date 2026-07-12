import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from '@/components/navigation/ProtectedRoute';
import GuestRoute from '@/components/navigation/GuestRoute';
import NotFound from '@/pages/NotFound';

// Auth Pages
import Login from '@/features/auth/pages/Login';
import ForgotPassword from '@/features/auth/pages/ForgotPassword';
import ResetPassword from '@/features/auth/pages/ResetPassword';
import Unauthorized from '@/features/auth/pages/Unauthorized';
import SessionExpired from '@/features/auth/pages/SessionExpired';

import DashboardHome from '@/features/dashboard/pages/DashboardHome';

// Organization Management Pages
import OrganizationDashboard from '@/features/organization/pages/OrganizationDashboard';
import OrganizationsList from '@/features/organization/pages/OrganizationsList';
import DepartmentsList from '@/features/organization/pages/DepartmentsList';
import BranchesList from '@/features/organization/pages/BranchesList';
// Teams
import TeamsList from '@/features/organization/pages/TeamsList';

// Booking & Reservation Pages
import BookingDashboardPage from '@/features/booking/pages/BookingDashboardPage';
import MeetingRoomBookingPage from '@/features/booking/pages/MeetingRoomBookingPage';
import VehicleBookingPage from '@/features/booking/pages/VehicleBookingPage';
import EquipmentBookingPage from '@/features/booking/pages/EquipmentBookingPage';
import WorkspaceBookingPage from '@/features/booking/pages/WorkspaceBookingPage';
import LabBookingPage from '@/features/booking/pages/LabBookingPage';
import BookingCalendarPage from '@/features/booking/pages/BookingCalendarPage';
import BookingHistoryPage from '@/features/booking/pages/BookingHistoryPage';
import BookingDetailPage from '@/features/booking/pages/BookingDetailPage';
import ApprovalPage from '@/features/booking/pages/ApprovalPage';

// Placeholders for routes to be developed in future phases

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
          {
            path: ROUTES.LOGIN,
            element: <Login />,
          },
          {
            path: '/forgot-password',
            element: <ForgotPassword />,
          },
          {
            path: '/reset-password',
            element: <ResetPassword />,
          },
          {
            path: '/session-expired',
            element: <SessionExpired />,
          }
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
            element: <DashboardHome />,
          },
          {
            path: ROUTES.ORGANIZATION,
            element: <OrganizationDashboard />,
          },
          {
            path: ROUTES.ORGANIZATION_LIST,
            element: <OrganizationsList />,
          },
          {
            path: ROUTES.DEPARTMENTS,
            element: <DepartmentsList />,
          },
          {
            path: ROUTES.BRANCHES,
            element: <BranchesList />,
          },
          {
            path: ROUTES.TEAMS,
            element: <TeamsList />,
          },
          {
            path: ROUTES.BOOKING_DASHBOARD,
            element: <BookingDashboardPage />,
          },
          {
            path: ROUTES.BOOKING_MEETING_ROOMS,
            element: <MeetingRoomBookingPage />,
          },
          {
            path: ROUTES.BOOKING_VEHICLES,
            element: <VehicleBookingPage />,
          },
          {
            path: ROUTES.BOOKING_EQUIPMENT,
            element: <EquipmentBookingPage />,
          },
          {
            path: ROUTES.BOOKING_WORKSPACES,
            element: <WorkspaceBookingPage />,
          },
          {
            path: ROUTES.BOOKING_LABS,
            element: <LabBookingPage />,
          },
          {
            path: ROUTES.BOOKING_CALENDAR,
            element: <BookingCalendarPage />,
          },
          {
            path: ROUTES.BOOKING_HISTORY,
            element: <BookingHistoryPage />,
          },
          {
            path: ROUTES.BOOKING_DETAILS,
            element: <BookingDetailPage />,
          },
          {
            path: ROUTES.BOOKING_APPROVALS,
            element: <ApprovalPage />,
          },
          // More protected routes will go here
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
