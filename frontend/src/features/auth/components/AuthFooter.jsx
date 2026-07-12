import { Link } from 'react-router-dom';

export const AuthFooter = ({ text, linkText, to }) => {
  return (
    <div className="mt-6 text-center text-sm text-gray-600">
      {text}{' '}
      <Link to={to} className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
        {linkText}
      </Link>
    </div>
  );
};
