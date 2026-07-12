import React, { useState, useEffect } from 'react';
import { Plus, Download, Filter, Search } from 'lucide-react';
import AssetTable from '../components/tables/AssetTable';
import { getAssets } from '../services/asset.service';
import AssetFormDialog from '../components/dialogs/AssetFormDialog';
import { useOrganizationData } from '@/features/organization/hooks/useOrganizationData';

const AssetList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dialog state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  const { categories } = useOrganizationData();

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const response = await getAssets();
      // Adjust according to standard API response structure
      const data = response.data?.data || response.data || [];
      setAssets(data);
    } catch (error) {
      console.error('Failed to fetch assets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);
  
  // Basic filter
  const filteredAssets = assets.filter(asset => 
    asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.assetTag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    setEditingAsset(null);
    setIsFormOpen(true);
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data) => {
    // In a real app, you would call createAsset or updateAsset API here
    console.log('Submitting asset:', data);
    // Refresh list
    fetchAssets();
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Asset Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your organization's physical and digital assets.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium text-sm w-full sm:w-auto justify-center">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium text-sm w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            Register Asset
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
            placeholder="Search assets by tag, serial, or name..."
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
      <AssetTable 
        data={filteredAssets} 
        onEdit={handleEdit}
        onView={handleEdit}
        onDelete={(asset) => console.log('Delete', asset)}
        isLoading={isLoading}
      />
      
      <AssetFormDialog 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        asset={editingAsset}
        categories={categories}
      />
    </div>
  );
};

export default AssetList;
