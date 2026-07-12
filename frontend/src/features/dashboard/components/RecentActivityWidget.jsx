import { SummaryCard } from './SummaryCard';
import { ActivityCard } from './ActivityCard';
import { ArrowRight } from 'lucide-react';

export const RecentActivityWidget = ({ activities = [] }) => {
  return (
    <SummaryCard 
      title="Recent Activity" 
      action={
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      }
    >
      <div className="space-y-1">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard key={activity.id} {...activity} />
          ))
        ) : (
          <p className="text-sm text-gray-500 py-4 text-center">No recent activity found.</p>
        )}
      </div>
    </SummaryCard>
  );
};
