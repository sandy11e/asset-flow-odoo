import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { Clock } from 'lucide-react';

const SessionExpired = () => {
  return (
    <div className="text-center w-full">
      <Clock className="w-16 h-16 text-warning-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Expired</h2>
      <p className="text-gray-600 mb-6">
        Your session has expired due to inactivity. Please log in again to continue.
      </p>
      <Link 
        to={ROUTES.LOGIN} 
        className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Log In Again
      </Link>
    </div>
  );
};

export default SessionExpired;
