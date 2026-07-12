import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { authService } from '../services/auth.service';
import { CheckCircle2, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

const ForgotPassword = () => {
  const [isSent, setIsSent] = useState(false);
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    setAuthError('');
    try {
      await authService.forgotPassword(data);
      setIsSent(true);
    } catch (error) {
      setAuthError(error.message || 'Failed to send reset link');
    }
  };

  if (isSent) {
    return (
      <div className="w-full bg-white py-12 px-6 shadow rounded-lg border border-gray-200 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
        <p className="text-gray-600 mb-6">
          We have sent a password reset link to your email address.
        </p>
        <Link to={ROUTES.LOGIN}>
          <Button variant="primary" className="w-full">Return to login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Reset password</h2>
        <p className="mt-2 text-sm text-gray-600">Enter your email to receive a reset link</p>
      </div>
      
      {authError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-red-700">{authError}</p>
        </div>
      )}
      
      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="admin@assetflow.com"
            icon={Mail}
            error={errors.email?.message}
            {...register('email')}
          />

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            isLoading={isSubmitting}
          >
            Send reset link
          </Button>

          <div className="text-center mt-4">
            <Link to={ROUTES.LOGIN} className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
