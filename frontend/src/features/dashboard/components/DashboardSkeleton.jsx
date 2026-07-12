export const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="h-10 bg-gray-200 rounded w-64"></div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded w-10"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-96 bg-gray-200 rounded-xl"></div>
        <div className="h-96 bg-gray-200 rounded-xl"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-80 bg-gray-200 rounded-xl"></div>
        <div className="lg:col-span-2 h-80 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};
