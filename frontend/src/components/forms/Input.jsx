import React, { forwardRef, useId } from 'react';

const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-sidebar-hover text-gray-900 dark:text-white shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border px-3 py-2 ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
