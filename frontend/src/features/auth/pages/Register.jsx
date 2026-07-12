import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '@/routes/routes';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';
import { Mail, Lock, User } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setAuthError('');
    try {
      await registerUser(data);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setAuthError(err.message || 'Failed to create account');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create an account</h2>
        <p className="mt-2 text-sm text-gray-600">Join AssetFlow to manage your resources</p>
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
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            icon={User}
            error={errors.name?.message}
            {...register('name')}
          />
          
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="admin@assetflow.com"
            icon={Mail}
            error={errors.email?.message}
            {...register('email')}
          />
          
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            error={errors.password?.message}
            {...register('password')}
          />

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            isLoading={isSubmitting}
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
