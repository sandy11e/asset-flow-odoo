export const KPICard = ({ title, value, subtitle, highlight = false }) => {
  return (
    <div className={`p-5 rounded-xl border ${highlight ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white'}`}>
      <h4 className="text-sm font-semibold text-gray-600 mb-1">{title}</h4>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
};
