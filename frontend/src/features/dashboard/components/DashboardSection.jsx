export const DashboardSection = ({ title, children, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      {title && <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>}
      {children}
    </div>
  );
};
