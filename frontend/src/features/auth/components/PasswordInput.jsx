import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordInput = forwardRef(({ label = 'Password', error, className = '', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={`w-full px-3 py-2 border ${
            error ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
          } rounded-md focus:outline-none focus:ring-1 pr-10`}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
