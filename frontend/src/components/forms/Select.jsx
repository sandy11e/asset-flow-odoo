import React, { forwardRef, useId } from 'react';

const Select = forwardRef(({
  label,
  options = [],
  error,
  icon: Icon,
  className = '',
  id,
  children,
  ...props
}, ref) => {
  const generatedId = useId();
  const selectId = id || generatedId;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-sidebar-hover text-gray-900 dark:text-white shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border px-3 py-2 ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
          {...props}
        >
          {children || options.map((opt, idx) => {
            const value = typeof opt === 'object' ? opt.value : opt;
            const labelStr = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={idx} value={value}>
                {labelStr}
              </option>
            );
          })}
        </select>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
