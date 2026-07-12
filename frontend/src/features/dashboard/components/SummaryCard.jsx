export const SummaryCard = ({ title, children, action }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};
