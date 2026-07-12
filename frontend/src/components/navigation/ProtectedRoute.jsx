import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';

const ProtectedRoute = ({ allowedRoles }) => {
  // TODO: Replace with actual auth context/state logic
  const isAuthenticated = true;
  const userRole = 'admin'; 

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to home/dashboard if not authorized for this specific route
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
