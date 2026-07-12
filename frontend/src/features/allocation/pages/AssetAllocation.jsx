import React, { useState } from 'react';
import { Plus, Download, Filter, Search } from 'lucide-react';
import AllocationTable from '../components/tables/AllocationTable';
import { allocationMockData } from '../mock/allocation.mock';

const AssetAllocation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredAllocations = allocationMockData.filter(alloc => 
    alloc.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alloc.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alloc.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Asset Allocations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage asset assignments, transfers, and returns across the organization.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium text-sm w-full sm:w-auto justify-center">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium text-sm w-full sm:w-auto justify-center">
            <Plus className="w-4 h-4" />
            New Allocation
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
            placeholder="Search by asset name, assigned user, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Data Table */}
      <AllocationTable 
        data={filteredAllocations} 
        onView={(alloc) => console.log('View', alloc)}
        onTransfer={(alloc) => console.log('Transfer', alloc)}
        onReturn={(alloc) => console.log('Return', alloc)}
      />
    </div>
  );
};

export default AssetAllocation;
