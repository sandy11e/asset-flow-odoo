import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { ShieldAlert } from 'lucide-react';
import EmptyState from '@/components/feedback/EmptyState';
import Button from '@/components/ui/Button';

const Unauthorized = () => {
  return (
    <div className="w-full bg-white py-12 px-4 shadow rounded-lg border border-gray-200">
      <EmptyState
        icon={ShieldAlert}
        title="Access Denied"
        description="You do not have permission to view this page. Please contact your administrator if you believe this is a mistake."
        action={
          <Link to={ROUTES.DASHBOARD}>
            <Button variant="primary">Return to Dashboard</Button>
          </Link>
        }
      />
    </div>
  );
};

export default Unauthorized;
