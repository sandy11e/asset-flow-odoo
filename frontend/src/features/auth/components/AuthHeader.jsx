export const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
    </div>
  );
};
