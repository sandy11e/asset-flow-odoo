import { QuickActionCard } from './QuickActionCard';
import { Monitor, Calendar, Wrench, UserPlus } from 'lucide-react';

export const QuickActionsPanel = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <QuickActionCard 
        title="Register Asset" 
        description="Add a new item to inventory" 
        icon={Monitor} 
      />
      <QuickActionCard 
        title="Book Resource" 
        description="Reserve a room or vehicle" 
        icon={Calendar} 
      />
      <QuickActionCard 
        title="Request Maintenance" 
        description="Report a broken asset" 
        icon={Wrench} 
      />
      <QuickActionCard 
        title="Allocate Asset" 
        description="Assign item to user" 
        icon={UserPlus} 
      />
    </div>
  );
};
