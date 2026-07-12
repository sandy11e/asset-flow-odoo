import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '@/routes/routes';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';
import { Mail, Lock } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setAuthError('');
    try {
      await login(data);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setAuthError(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
        <p className="mt-2 text-sm text-gray-600">Sign in to your AssetFlow account</p>
      </div>
      
      {authError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{authError}</p>
            </div>
          </div>
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
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700 invisible">Password Label</label>
              <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 absolute -mt-7 right-6 sm:right-10">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
