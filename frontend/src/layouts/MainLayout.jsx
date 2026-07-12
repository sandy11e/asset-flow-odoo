import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-sidebar-bg text-sidebar-text hidden md:flex flex-col">
        <div className="p-4 border-b border-sidebar-hover">
          <h1 className="text-xl font-bold tracking-wider">AssetFlow</h1>
        </div>
        <div className="flex-1 p-4">
          <p className="text-sm text-gray-400">Navigation Menu</p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Placeholder */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 justify-between shrink-0">
          <div className="flex items-center gap-4 md:hidden">
            <span className="font-bold">AssetFlow</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
              U
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
