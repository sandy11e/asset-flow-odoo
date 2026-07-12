import React from 'react';
import { Download, RefreshCw, TrendingUp, TrendingDown, Activity, ShieldCheck } from 'lucide-react';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import { assetStatusData, maintenanceCostTrendData, topKPIs } from '../mock/analytics.mock';

const AnalyticsDashboard = () => {
  return (
    <div className="p-6 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Analytics Overview</h1>
          <p className="text-sm text-gray-500 mt-1">High-level metrics and trends across all asset operations.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => alert('Data refresh triggered. Fetching latest analytics...')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium text-sm w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button 
            onClick={() => alert('Report generated and downloaded successfully!')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium text-sm w-full sm:w-auto justify-center"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {topKPIs.map((kpi) => (
          <div key={kpi.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
              <div className={`p-2 rounded-lg ${kpi.id === 1 ? 'bg-indigo-50 text-indigo-600' : kpi.id === 2 ? 'bg-rose-50 text-rose-600' : kpi.id === 3 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                {kpi.id === 1 && <Activity className="w-5 h-5" />}
                {kpi.id === 2 && <TrendingDown className="w-5 h-5" />}
                {kpi.id === 3 && <ShieldCheck className="w-5 h-5" />}
                {kpi.id === 4 && <TrendingUp className="w-5 h-5" />}
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl font-bold text-gray-900">{kpi.value}</h2>
              <span className={`flex items-center text-sm font-medium ${kpi.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {kpi.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Cost Trend Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Maintenance Costs Trend</h3>
            <p className="text-sm text-gray-500">Total expenditure over the last 6 months.</p>
          </div>
          <BarChart data={maintenanceCostTrendData} height={320} />
        </div>

        {/* Asset Distribution Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Asset Status Distribution</h3>
            <p className="text-sm text-gray-500">Current state of all tracked assets.</p>
          </div>
          <div className="flex items-center justify-center pt-4">
             <PieChart data={assetStatusData} height={280} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
