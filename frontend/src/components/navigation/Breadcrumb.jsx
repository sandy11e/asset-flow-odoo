import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 sm:space-x-4">
        <li>
          <div>
            <Link to="/" className="text-gray-400 hover:text-gray-500 transition-colors">
              <Home className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {item.href ? (
                <Link
                  to={item.href}
                  className="ml-2 sm:ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="ml-2 sm:ml-4 text-sm font-medium text-gray-900"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
