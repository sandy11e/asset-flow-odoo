import React, { useState } from 'react';
import { Settings, Filter, CheckCircle2 } from 'lucide-react';
import NotificationItem from '../components/cards/NotificationItem';
import { notificationMockData } from '../mock/notification.mock';

const AllNotifications = () => {
  const [notifications, setNotifications] = useState(notificationMockData);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, isUnread: false } : notif)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isUnread: false })));
  };

  const unreadCount = notifications.filter(n => n.isUnread).length;

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            Notifications
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold">
                {unreadCount} New
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Stay updated on your asset approvals, tasks, and system alerts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark all read
          </button>
          <button className="p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col gap-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <NotificationItem 
                key={notif.id} 
                notification={notif} 
                onMarkRead={handleMarkAsRead}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllNotifications;
