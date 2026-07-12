import React from 'react';
import { clsx } from 'clsx';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const NotificationItem = ({ notification, onMarkRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'approval': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      case 'task': return <Bell className="w-5 h-5 text-indigo-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className={clsx(
      "relative flex gap-4 p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer",
      notification.isUnread ? "bg-indigo-50/30 border-indigo-100" : "bg-white border-gray-100"
    )}>
      {/* Unread indicator dot */}
      {notification.isUnread && (
        <span className="absolute top-4 right-4 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
      )}

      {/* Icon */}
      <div className="flex-shrink-0 mt-1">
        <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
          {getIcon()}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pr-6">
        <div className="flex items-center justify-between mb-1">
          <h4 className={clsx(
            "text-sm font-semibold tracking-tight",
            notification.isUnread ? "text-gray-900" : "text-gray-700"
          )}>
            {notification.title}
          </h4>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-2 leading-relaxed">
          {notification.message}
        </p>
        <span className="text-xs font-medium text-gray-400">
          {notification.timestamp}
        </span>
      </div>
      
      {/* Actions */}
      {notification.isUnread && onMarkRead && (
        <div className="absolute bottom-4 right-4">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               onMarkRead(notification.id);
             }}
             className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-md transition-colors"
           >
             Mark as read
           </button>
        </div>
      )}
    </div>
  );
};

export default NotificationItem;
