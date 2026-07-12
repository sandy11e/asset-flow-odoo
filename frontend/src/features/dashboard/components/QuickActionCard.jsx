export const QuickActionCard = ({ title, description, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-md transition-all group"
    >
      <div className="flex-shrink-0 bg-primary-50 p-3 rounded-lg group-hover:bg-primary-100 transition-colors">
        {Icon && <Icon className="w-6 h-6 text-primary-600" />}
      </div>
      <div className="ml-4">
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </button>
  );
};
