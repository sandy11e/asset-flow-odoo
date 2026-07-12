import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { ShieldAlert } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="text-center w-full">
      <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-6">
        You do not have permission to view this page. Please contact your administrator if you believe this is a mistake.
      </p>
      <Link 
        to={ROUTES.DASHBOARD} 
        className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;
