import { useAuth } from '@/features/auth/context/AuthContext';
import { SummaryCard } from './SummaryCard';
import { Shield, Mail } from 'lucide-react';

export const ProfileSummary = () => {
  const { user } = useAuth();
  
  return (
    <SummaryCard title="Profile Summary">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-2xl font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900">{user?.name || 'Admin User'}</h4>
          <p className="text-sm text-gray-500 capitalize">{user?.role || 'Administrator'}</p>
        </div>
      </div>
      <div className="space-y-3 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          {user?.email || 'admin@assetflow.com'}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Shield className="w-4 h-4 mr-2 text-gray-400" />
          Full System Access
        </div>
      </div>
    </SummaryCard>
  );
};
