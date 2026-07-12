export const WelcomeBanner = ({ user, date }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back, {user?.name || 'User'}! 👋
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Here is what's happening with your assets today.
        </p>
      </div>
      {date && (
        <div className="mt-4 sm:mt-0 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium text-gray-700">
          {date}
        </div>
      )}
    </div>
  );
};
