import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const NotificationCard = ({ type = 'info', title, message, time }) => {
  const config = {
    info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
    success: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    warning: { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    error: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
  };

  const { icon: Icon, color, bg } = config[type] || config.info;

  return (
    <div className="flex items-start p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
      <div className={`flex-shrink-0 p-2 rounded-full ${bg} ${color} mt-0.5`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{message}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
};
