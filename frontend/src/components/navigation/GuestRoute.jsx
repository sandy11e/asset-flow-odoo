import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
import { ROUTES } from '@/routes/routes';
import LoadingScreen from '@/components/feedback/LoadingScreen';

const GuestRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Checking session..." />;
  }

  // If the user is already authenticated, redirect them to the dashboard
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
