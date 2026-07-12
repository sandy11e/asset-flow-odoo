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
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
          <div className="bg-white p-8 rounded-xl shadow-sm max-w-lg w-full border border-gray-100">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              An unexpected error occurred. Please try refreshing the page or contact support if the issue persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium w-full"
            >
              Reload Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 text-left p-4 bg-gray-100 rounded-md overflow-auto text-xs text-gray-800 max-h-48">
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
