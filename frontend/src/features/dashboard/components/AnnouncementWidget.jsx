import { Megaphone } from 'lucide-react';

export const AnnouncementWidget = ({ title, message, date }) => {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
      <div className="absolute -right-6 -top-6 text-white/10">
        <Megaphone className="w-32 h-32" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-white/20 text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider">Announcement</span>
          {date && <span className="text-xs text-primary-100">{date}</span>}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-primary-100 text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
};
