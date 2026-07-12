import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../schemas/reset-password.schema';
import { PasswordInput } from './PasswordInput';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { Loader2 } from 'lucide-react';

export const ResetPasswordForm = ({ onSubmit, isLoading, error }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">
          {error}
        </div>
      )}

      <div>
        <PasswordInput
          label="New Password"
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordStrengthIndicator password={password} />
      </div>

      <div>
        <PasswordInput
          label="Confirm New Password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors mt-2"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Reset Password'}
      </button>
    </form>
  );
};
