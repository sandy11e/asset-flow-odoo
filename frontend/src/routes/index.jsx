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
import TeamsList from '@/features/organization/pages/TeamsList';

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
