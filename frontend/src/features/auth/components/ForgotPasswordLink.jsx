import { Link } from 'react-router-dom';

export const ForgotPasswordLink = ({ to = '/forgot-password', text = 'Forgot password?' }) => {
  return (
    <div className="text-sm">
      <Link to={to} className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
        {text}
      </Link>
    </div>
  );
};
