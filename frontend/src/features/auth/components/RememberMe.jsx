import { forwardRef } from 'react';

export const RememberMe = forwardRef(({ id = 'remember-me', label = 'Remember me', ...props }, ref) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        ref={ref}
        type="checkbox"
        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded rounded-sm cursor-pointer"
        {...props}
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-900 cursor-pointer">
        {label}
      </label>
    </div>
  );
});

RememberMe.displayName = 'RememberMe';
