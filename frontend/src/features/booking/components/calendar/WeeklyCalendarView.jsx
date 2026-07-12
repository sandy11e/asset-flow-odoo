import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const WeeklyCalendarView = ({ bookings = [], onSlotClick, onBookingClick, className = '' }) => {
  const weekDays = [
    { dayName: 'Mon', date: 'Jul 13', fullDate: '2026-07-13' },
    { dayName: 'Tue', date: 'Jul 14', fullDate: '2026-07-14' },
    { dayName: 'Wed', date: 'Jul 15 (Today)', fullDate: '2026-07-15', isToday: true },
    { dayName: 'Thu', date: 'Jul 16', fullDate: '2026-07-16' },
    { dayName: 'Fri', date: 'Jul 17', fullDate: '2026-07-17' },
    { dayName: 'Sat', date: 'Jul 18', fullDate: '2026-07-18' },
    { dayName: 'Sun', date: 'Jul 19', fullDate: '2026-07-19' },
  ];

  const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  return (
    <div className={`bg-white dark:bg-sidebar-hover rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xs ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-sidebar-bg flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary-500" />
          <span>Week of July 13 — July 19, 2026</span>
        </h3>
        <span className="text-xs font-semibold text-gray-500">Hourly Slot Resolution</span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-sidebar-bg text-[11px] font-bold text-gray-600 dark:text-gray-300 text-center py-2.5">
            <div className="border-r border-gray-200 dark:border-gray-700">Time</div>
            {weekDays.map((d) => (
              <div key={d.fullDate} className={d.isToday ? 'text-primary-600 font-extrabold' : ''}>
                {d.dayName} <span className="block text-[10px] text-gray-400 font-normal">{d.date}</span>
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700/80">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 h-16 text-xs">
                <div className="border-r border-gray-200 dark:border-gray-700 p-2 text-gray-400 font-mono text-[11px] flex items-center justify-center bg-gray-50/30 dark:bg-sidebar-bg/50">
                  {hour}
                </div>
                {weekDays.map((d) => {
                  const matching = bookings.filter((b) => b.startTime && b.startTime.startsWith(d.fullDate));
                  return (
                    <div
                      key={`${d.fullDate}-${hour}`}
                      onClick={() => onSlotClick && onSlotClick(`${d.fullDate} ${hour}`)}
                      className="border-r border-gray-100 dark:border-gray-700/50 p-1 hover:bg-primary-50/30 dark:hover:bg-sidebar-hover/80 cursor-pointer transition-colors relative"
                    >
                      {matching.slice(0, 1).map((b) => (
                        <div
                          key={b.id}
                          onClick={(e) => { e.stopPropagation(); onBookingClick && onBookingClick(b); }}
                          className="h-full p-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200 text-[10px] font-semibold truncate flex items-center"
                          title={b.title}
                        >
                          {b.resourceName || b.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendarView;
