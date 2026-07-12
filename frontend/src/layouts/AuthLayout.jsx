import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">AssetFlow</h1>
          <p className="mt-2 text-sm text-gray-600 font-medium">Enterprise Asset Management</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
