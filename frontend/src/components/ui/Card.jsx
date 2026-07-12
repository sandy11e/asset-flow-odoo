import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white shadow rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

Card.Header = ({ title, subtitle, action, className = '' }) => (
  <div className={`px-6 py-5 border-b border-gray-200 flex justify-between items-center ${className}`}>
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`px-6 py-5 ${className}`}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

export default Card;
