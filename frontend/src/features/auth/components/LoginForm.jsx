import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/login.schema';
import { PasswordInput } from './PasswordInput';
import { RememberMe } from './RememberMe';
import { ForgotPasswordLink } from './ForgotPasswordLink';
import { Loader2 } from 'lucide-react';

export const LoginForm = ({ onSubmit, isLoading, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={`w-full px-3 py-2 border ${
            errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
          } rounded-md shadow-sm focus:outline-none focus:ring-1`}
          placeholder="admin@assetflow.com"
          {...register('email')}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <PasswordInput
          label="Password"
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      <div className="flex items-center justify-between">
        <RememberMe {...register('rememberMe')} />
        <ForgotPasswordLink />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
      </button>
    </form>
  );
};
