import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const isDev = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.DEV : false;

      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-sidebar-bg p-6 text-center transition-colors">
          <div className="bg-white dark:bg-sidebar-hover p-8 rounded-xl shadow-sm max-w-lg w-full border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
              An unexpected error occurred. Please try refreshing the page or contact support if the issue persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-gray-900 dark:bg-primary-600 text-white rounded-md hover:bg-gray-800 dark:hover:bg-primary-700 transition-colors font-medium w-full cursor-pointer"
            >
              Reload Page
            </button>
            {isDev && (
              <div className="mt-6 text-left p-4 bg-gray-100 dark:bg-gray-900 rounded-md overflow-auto text-xs text-gray-800 dark:text-gray-200 max-h-48">
                <pre>{this.state.error?.toString()}</pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
