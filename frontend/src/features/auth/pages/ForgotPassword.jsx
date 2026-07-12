import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { authService } from '../services/auth.service';
import { Loader2, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = new FormData(e.target).get('email');
    
    try {
      await authService.forgotPassword({ email });
      setIsSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center w-full">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
        <p className="text-gray-600 mb-6">
          We have sent a password reset link to your email address.
        </p>
        <Link to={ROUTES.LOGIN} className="text-primary-600 font-medium hover:text-primary-500">
          Return to login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Reset your password</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Enter your email address and we will send you a link to reset your password.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            name="email"
            type="email" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send reset link'}
        </button>

        <div className="text-center mt-4">
          <Link to={ROUTES.LOGIN} className="text-sm text-gray-600 hover:text-gray-900">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
