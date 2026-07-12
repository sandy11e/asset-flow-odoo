import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

const MonthlyCalendarView = ({
  bookings = [],
  currentMonth = new Date(2026, 6, 1), // July 2026
  onSlotClick,
  onBookingClick,
  className = '',
}) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // July 2026 starts on Wednesday (offset 3), 31 days
  const firstDayOffset = 3;
  const daysInMonth = 31;

  const getBookingsForDay = (dayNum) => {
    return bookings.filter((b) => {
      if (!b.startTime) return false;
      const date = new Date(b.startTime);
      return date.getDate() === dayNum;
    });
  };

  return (
    <div className={`bg-white dark:bg-sidebar-hover rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xs ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-sidebar-bg">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-primary-500" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">July 2026 — Monthly Reservation Schedule</h3>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 text-xs font-bold text-gray-700 dark:text-gray-200">Today</span>
          <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-sidebar-bg text-[11px] font-bold text-gray-500 text-center py-2">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 auto-rows-[105px] divide-x divide-y divide-gray-100 dark:divide-gray-700/80 bg-gray-50/20 dark:bg-transparent">
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-gray-50/50 dark:bg-gray-900/20 p-1.5 opacity-40 text-[10px] text-gray-400">
            {28 + i}
          </div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const dayBookings = getBookingsForDay(dayNum);
          const isToday = dayNum === 15; // Simulated today July 15

          return (
            <div
              key={`day-${dayNum}`}
              onClick={() => onSlotClick && onSlotClick(`2026-07-${String(dayNum).padStart(2, '0')}`)}
              className={`p-1.5 overflow-hidden transition-colors cursor-pointer flex flex-col justify-between ${
                isToday ? 'bg-primary-50/30 dark:bg-primary-950/20 font-bold' : 'hover:bg-gray-50 dark:hover:bg-sidebar-hover/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold ${
                    isToday ? 'bg-primary-600 text-white shadow-xs' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {dayNum}
                </span>
                {dayBookings.length > 0 && (
                  <span className="text-[10px] px-1 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold">
                    {dayBookings.length}
                  </span>
                )}
              </div>

              <div className="space-y-1 mt-1 overflow-y-auto max-h-[68px]">
                {dayBookings.map((b) => (
                  <div
                    key={b.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookingClick && onBookingClick(b);
                    }}
                    className="p-1 rounded text-[10px] bg-primary-100/80 dark:bg-primary-900/60 text-primary-900 dark:text-primary-200 truncate font-semibold hover:opacity-80 transition-opacity"
                    title={b.title}
                  >
                    • {b.resourceName || b.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyCalendarView;
