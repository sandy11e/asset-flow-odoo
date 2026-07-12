import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from '@/components/navigation/ProtectedRoute';
import NotFound from '@/pages/NotFound';

// Placeholders for routes to be developed in future phases
const LoginPlaceholder = () => <div className="p-4 text-center">Login Page (Pending)</div>;
const DashboardPlaceholder = () => <div className="p-4">Dashboard Module (Pending)</div>;

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPlaceholder />,
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
            element: <DashboardPlaceholder />,
          },
          // More protected routes will go here
        ],
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
]);
