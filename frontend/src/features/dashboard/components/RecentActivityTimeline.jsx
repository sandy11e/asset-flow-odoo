import { SummaryCard } from './SummaryCard';

export const RecentActivityTimeline = ({ activities = [] }) => {
  return (
    <SummaryCard title="Recent Activity Timeline">
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, idx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {idx !== activities.length - 1 && (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center ring-8 ring-white">
                      <span className="text-primary-600 text-xs font-bold">{activity.user.charAt(0)}</span>
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {activity.action} <span className="font-medium text-gray-900">{activity.item}</span>
                      </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      {activity.time}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SummaryCard>
  );
};
