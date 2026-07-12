import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Plus, Search, Filter, MoreVertical, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import MainContentWrapper from '@/components/layout/MainContentWrapper';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import CreateAuditDialog from '../components/CreateAuditDialog';

// Mock Data for demonstration
const mockAudits = [
  {
    id: 'AUD-2023-001',
    title: 'Q3 IT Hardware Compliance',
    status: 'In Progress',
    dueDate: '2023-11-15',
    progress: 45,
    auditor: 'Sarah Jenkins',
    assetsCount: 1450
  },
  {
    id: 'AUD-2023-002',
    title: 'Annual Fleet Vehicle Inspection',
    status: 'Completed',
    dueDate: '2023-10-01',
    progress: 100,
    auditor: 'Mike Thompson',
    assetsCount: 85
  },
  {
    id: 'AUD-2023-003',
    title: 'Regional Office Furniture Inventory',
    status: 'Pending',
    dueDate: '2023-12-01',
    progress: 0,
    auditor: 'Elena Rodriguez',
    assetsCount: 320
  }
];

const getStatusStyles = (status) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
    case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Completed': return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
    case 'In Progress': return <Clock className="w-3.5 h-3.5 mr-1" />;
    case 'Pending': return <AlertCircle className="w-3.5 h-3.5 mr-1" />;
    default: return null;
  }
};

const AuditList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const breadcrumbs = [
    { name: 'ERP Portal', href: '/dashboard' },
    { name: 'Compliance & Audits' },
  ];

  return (
    <MainContentWrapper>
      <PageHeader
        title="Compliance & Audit Control"
        subtitle="Manage inventory verifications, compliance checks, and regulatory audits across the enterprise."
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsCreateOpen(true)}>
              Initiate New Audit
            </Button>
          </div>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-6 space-y-6"
      >
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search audits by ID, title, or auditor..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="secondary" size="sm" icon={Filter} className="w-full sm:w-auto">
              Filters
            </Button>
          </div>
        </div>

        {/* Audit List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockAudits.map((audit) => (
            <div key={audit.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow group">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                      <ClipboardCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1" title={audit.title}>
                        {audit.title}
                      </h3>
                      <p className="text-xs text-gray-500">{audit.id}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lead Auditor</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{audit.auditor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Target Assets</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{audit.assetsCount.toLocaleString()} items</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Deadline</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{new Date(audit.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-primary-600 dark:text-primary-400">{audit.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-primary-500 h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${audit.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${getStatusStyles(audit.status)}`}>
                  {getStatusIcon(audit.status)}
                  {audit.status}
                </span>
                <button 
                  onClick={() => alert(`View details for ${audit.id}`)}
                  className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  View Details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <CreateAuditDialog 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSubmit={(data) => {
          console.log('Created audit', data);
          setIsCreateOpen(false);
        }} 
      />
    </MainContentWrapper>
  );
};

export default AuditList;
