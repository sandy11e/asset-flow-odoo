import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';

const placeholderNotifications = [
  {
    id: 1,
    title: 'Overdue Return Alert',
    message: 'Laptop AF-0114 held by Raj was due yesterday.',
    time: '10 min ago',
    type: 'warning',
    unread: true,
  },
  {
    id: 2,
    title: 'Maintenance Approved',
    message: 'Projector B2 repair ticket has been approved.',
    time: '1 hour ago',
    type: 'success',
    unread: true,
  },
  {
    id: 3,
    title: 'Booking Reminder',
    message: 'Conference Room A booking starts in 30 minutes.',
    time: '2 hours ago',
    type: 'info',
    unread: true,
  },
];

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(placeholderNotifications);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />;
      default:
        return <Clock className="w-4 h-4 text-primary-500 shrink-0" />;
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Bell Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-150 focus:outline-none cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-xl border border-gray-100 z-50 overflow-hidden divide-y divide-gray-100"
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-[11px] font-semibold">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-500">
                  No notifications available
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 flex gap-3 hover:bg-gray-50/80 transition-colors ${
                      item.unread ? 'bg-primary-50/30' : ''
                    }`}
                  >
                    <div className="mt-0.5">{getIcon(item.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 bg-gray-50/50 text-center">
              <a
                href="#notifications"
                onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-primary-600 transition-colors"
              >
                <span>View all notifications</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
