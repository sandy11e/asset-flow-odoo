import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
      <AlertCircle className="w-16 h-16 text-primary-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link 
        to={ROUTES.HOME}
        className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
