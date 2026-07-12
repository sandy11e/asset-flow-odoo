import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { Clock } from 'lucide-react';
import EmptyState from '@/components/feedback/EmptyState';
import Button from '@/components/ui/Button';

const SessionExpired = () => {
  return (
    <div className="w-full bg-white py-12 px-4 shadow rounded-lg border border-gray-200">
      <EmptyState
        icon={Clock}
        title="Session Expired"
        description="Your session has expired due to inactivity. Please log in again to continue."
        action={
          <Link to={ROUTES.LOGIN}>
            <Button variant="primary">Log In Again</Button>
          </Link>
        }
      />
    </div>
  );
};

export default SessionExpired;
