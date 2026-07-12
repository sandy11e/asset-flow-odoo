import React from 'react';
import { User, Shield, Bell, Palette, Globe, Key } from 'lucide-react';
import AccountSettingsForm from '../components/forms/AccountSettingsForm';
import { userProfileMock } from '../mock/profile.mock';

const AccountSettings = () => {
  const handleSave = (data) => {
    console.log('Saved Profile Data:', data);
    // In a real app, this would dispatch an API call and show a toast
  };

  const navItems = [
    { icon: User, label: 'My Profile', active: true },
    { icon: Shield, label: 'Security', active: false },
    { icon: Bell, label: 'Notifications', active: false },
    { icon: Palette, label: 'Appearance', active: false },
    { icon: Globe, label: 'Language & Region', active: false },
  ];

  return (
    <div className="p-6 max-w-[1200px] mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your profile, security preferences, and system appearance.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button 
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.active 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }\`}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Avatar Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-6">
            <img 
              src={userProfileMock.avatarUrl} 
              alt="Profile" 
              className="w-20 h-20 rounded-full border-4 border-indigo-50 shadow-sm object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
              <p className="text-sm text-gray-500 mt-1 mb-3">PNG, JPG up to 5MB. Must be appropriate for work.</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  Upload New
                </button>
                <button className="px-4 py-2 bg-white border border-gray-200 text-rose-600 text-sm font-medium rounded-lg hover:bg-rose-50 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              <p className="text-sm text-gray-500">Update your primary contact details and working location.</p>
            </div>
            
            <AccountSettingsForm 
              initialData={userProfileMock} 
              onSubmit={handleSave} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
