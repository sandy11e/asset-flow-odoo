export const ChartContainer = ({ title, children, height = 'h-72' }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {title && <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>}
      <div className={`relative w-full ${height}`}>
        {children}
      </div>
    </div>
  );
};
