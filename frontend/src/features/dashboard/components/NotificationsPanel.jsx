import { SummaryCard } from './SummaryCard';
import { NotificationCard } from './NotificationCard';

export const NotificationsPanel = ({ notifications = [] }) => {
  return (
    <SummaryCard title="Notifications">
      <div className="space-y-1">
        {notifications.length > 0 ? (
          notifications.map((notif, idx) => (
            <NotificationCard key={idx} {...notif} />
          ))
        ) : (
          <p className="text-sm text-gray-500 py-4 text-center">All caught up!</p>
        )}
      </div>
    </SummaryCard>
  );
};
