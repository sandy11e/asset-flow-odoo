export const AuthIllustration = () => {
  return (
    <div className="hidden lg:flex w-1/2 bg-primary-900 items-center justify-center p-12">
      <div className="max-w-lg text-center">
        {/* Placeholder for an actual illustration / SVG */}
        <div className="w-64 h-64 mx-auto bg-primary-800 rounded-full flex items-center justify-center mb-8 shadow-2xl">
          <svg className="w-32 h-32 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Manage your assets with precision
        </h2>
        <p className="text-primary-200 text-lg">
          AssetFlow provides centralized control over all your enterprise resources, preventing overlaps and streamlining maintenance.
        </p>
      </div>
    </div>
  );
};
