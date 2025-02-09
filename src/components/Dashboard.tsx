import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import {
  ChartBarIcon,
  HomeIcon,
  CogIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  ChartPieIcon,
  DocumentArrowUpIcon,
  MegaphoneIcon,
  ArrowsPointingOutIcon, // Changed from CrosshairIcon
  ClockIcon,
  CircleStackIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { name: 'Ad Spend', value: '$189.57', change: '-10.25%', icon: ShoppingCartIcon },
    { name: 'Impressions', value: '139.71K', change: '+14.03%', icon: ChartBarIcon },
    { name: 'ACoS', value: '27.15%', change: '+43.82%', icon: ChartPieIcon },
    { name: 'Ad Revenue', value: '$698.3', change: '+59.75%', icon: UserGroupIcon },
  ];

  const navigationItems = [
    { name: 'Overview', icon: HomeIcon, id: 'overview' },
    { name: 'Insights', icon: ChartPieIcon, id: 'insights' },
    { name: 'Campaign Manager', icon: MegaphoneIcon, id: 'campaigns' },
    { name: 'Targets & Search Terms', icon: ArrowsPointingOutIcon, id: 'targets' }, // Updated icon here
    { name: 'History', icon: ClockIcon, id: 'history' },
    { name: 'DSP', icon: CircleStackIcon, id: 'dsp' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle CSV file upload
      console.log('File uploaded:', file.name);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href="#"
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </a>
          ))}
        </nav>

        <div className="mt-8 space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-white mb-3">Import Data</h3>
            <div className="space-y-2">
              <label className="flex items-center p-2 text-sm text-gray-400 hover:bg-gray-700 rounded-md cursor-pointer">
                <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                <span>Upload CSV</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button className="flex items-center w-full p-2 text-sm text-gray-400 hover:bg-gray-700 rounded-md">
                <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
                Connect Google Sheets
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-white mb-3">Amazon Reports</h3>
            <button className="flex items-center w-full p-2 text-sm text-gray-400 hover:bg-gray-700 rounded-md">
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              Download Reports
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-white">
                {navigationItems.find(item => item.id === activeTab)?.name || 'Overview'}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <button className="hover:text-white">Last 14 Days</button>
                <span>•</span>
                <button className="hover:text-white">Compare</button>
              </div>
            </div>
            <button
              onClick={signOut}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="stat-card">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-6 h-6 text-teal-500" />
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{stat.value}</h3>
                <p className="text-sm text-gray-400">{stat.name}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Ad Spend Overview</h3>
                <div className="flex space-x-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-400">Current</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-400">Previous</span>
                  </div>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
                <p className="text-gray-400">Ad spend chart will be displayed here</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Campaign Performance</h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
                  <p className="text-gray-400">Campaign metrics chart will be displayed here</p>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Search Terms Analysis</h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
                  <p className="text-gray-400">Search terms chart will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}