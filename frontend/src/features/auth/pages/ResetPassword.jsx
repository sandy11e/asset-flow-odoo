import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { authService } from '../services/auth.service';
import { Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    setAuthError('');
    try {
      await authService.resetPassword({ password: data.password });
      navigate(ROUTES.LOGIN, { state: { message: 'Password reset successful. Please login.' } });
    } catch (err) {
      setAuthError('Failed to reset password. The link might be expired.');
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Set new password</h2>
        <p className="mt-2 text-sm text-gray-600">Please enter your new password below</p>
      </div>
      
      {authError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-red-700">{authError}</p>
        </div>
      )}

      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            id="password"
            label="New Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            error={errors.password?.message}
            {...register('password')}
          />
          
          <Input
            id="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            isLoading={isSubmitting}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
