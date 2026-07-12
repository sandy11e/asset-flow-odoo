import { Loader2 } from 'lucide-react';

const LoadingScreen = ({ fullScreen = true, message = 'Loading...' }) => {
  const containerClasses = fullScreen 
    ? "min-h-screen w-full flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm fixed inset-0 z-50"
    : "w-full h-full min-h-[200px] flex flex-col items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-4" />
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );
};

export default LoadingScreen;
