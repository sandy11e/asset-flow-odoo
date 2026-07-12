import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">AssetFlow</h1>
          <p className="text-gray-500 mt-2">Enterprise Asset Management</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
