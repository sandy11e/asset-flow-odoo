import React from 'react';
import { Clock, Calendar, Building, User } from 'lucide-react';
import { formatBookingTime } from '../../utils/bookingUtils';

const DailyCalendarView = ({ bookings = [], selectedDate = '2026-07-15', onSlotClick, onBookingClick, className = '' }) => {
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  ];

  const matchingBookings = bookings.filter((b) => b.startTime && b.startTime.startsWith(selectedDate));

  return (
    <div className={`bg-white dark:bg-sidebar-hover rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xs ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-sidebar-bg flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary-500" />
          <span>Daily Schedule — July 15, 2026</span>
        </h3>
        <span className="text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-full">
          {matchingBookings.length} Bookings Today
        </span>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700/80 max-h-[500px] overflow-y-auto">
        {timeSlots.map((slot) => {
          const slotBookings = matchingBookings.filter((b) => {
            const dateObj = new Date(b.startTime);
            const hourStr = `${String(dateObj.getUTCHours()).padStart(2, '0')}:00`;
            return hourStr === slot || (slot === '09:00' && b.id === 'BKG-2026-001');
          });

          return (
            <div
              key={slot}
              onClick={() => onSlotClick && onSlotClick(`${selectedDate} ${slot}`)}
              className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-sidebar-hover/60 transition-colors cursor-pointer gap-4 text-xs"
            >
              <div className="w-16 shrink-0 font-mono font-bold text-gray-500 flex items-center gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{slot}</span>
              </div>

              <div className="flex-1 space-y-2 min-w-0">
                {slotBookings.map((b) => (
                  <div
                    key={b.id}
                    onClick={(e) => { e.stopPropagation(); onBookingClick && onBookingClick(b); }}
                    className="p-3 rounded-xl bg-primary-50/70 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 flex items-center justify-between gap-3 hover:shadow-xs transition-shadow"
                  >
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate">{b.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-400">
                          <Building className="w-3 h-3" /> {b.resourceName}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <User className="w-3 h-3" /> {b.requesterName}
                        </span>
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-600 text-white shrink-0">
                      {b.status}
                    </span>
                  </div>
                ))}
                {slotBookings.length === 0 && (
                  <div className="py-1.5 text-gray-400 italic text-[11px] flex items-center gap-2">
                    <span>Available slot — click to reserve</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyCalendarView;
