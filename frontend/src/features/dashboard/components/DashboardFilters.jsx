export const DashboardFilters = () => {
  return (
    <div className="flex gap-2">
      <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 shadow-sm">
        <option>All Departments</option>
        <option>IT & Engineering</option>
        <option>Operations</option>
        <option>HR & Admin</option>
      </select>
      <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 shadow-sm hidden sm:block">
        <option>All Categories</option>
        <option>Electronics</option>
        <option>Furniture</option>
        <option>Vehicles</option>
      </select>
    </div>
  );
};
