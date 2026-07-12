export const AuthCard = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8 ${className}`}>
      {children}
    </div>
  );
};
