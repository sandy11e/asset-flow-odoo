import { useNavigate } from 'react-router-dom';
import { QuickActionCard } from './QuickActionCard';
import { Monitor, Calendar, Wrench } from 'lucide-react';

export const QuickActionsPanel = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <QuickActionCard 
        title="Register Asset" 
        description="Add a new item to inventory" 
        icon={Monitor} 
        onClick={() => navigate('/assets')}
      />
      <QuickActionCard 
        title="Book Resource" 
        description="Reserve a room or vehicle" 
        icon={Calendar} 
        onClick={() => navigate('/booking/dashboard')}
      />
      <QuickActionCard 
        title="Request Maintenance" 
        description="Report a broken asset" 
        icon={Wrench} 
        onClick={() => navigate('/maintenance')}
      />
    </div>
  );
};
