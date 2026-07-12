export const ActivityCard = ({ action, user, item, time }) => {
  return (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
        {user.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 truncate">
          <span className="font-semibold">{user}</span> {action} <span className="font-medium text-primary-600">{item}</span>
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{time}</p>
      </div>
    </div>
  );
};
