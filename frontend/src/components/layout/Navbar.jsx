import React, { useState } from 'react';
import { Menu, Search, Sun, Moon, Command, ShieldCheck } from 'lucide-react';
import NotificationBell from './NotificationBell';
import ProfileDropdown from './ProfileDropdown';
import { useTheme } from '@/hooks/useTheme';

const Navbar = ({ onOpenMobileMenu }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-white dark:bg-sidebar-bg border-b border-gray-200 dark:border-sidebar-hover flex items-center justify-between px-4 sm:px-6 shrink-0 z-30 sticky top-0 transition-colors">
      {/* Left side: Mobile menu toggle & Brand/Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-md">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-sidebar-hover transition-colors md:hidden cursor-pointer"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Logo Brand */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-base text-gray-900 dark:text-white">AssetFlow</span>
        </div>

        {/* Global Search Bar placeholder */}
        <div className="relative w-full hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets, serials, allocations (e.g. AF-0001)..."
            className="w-full pl-10 pr-12 py-2 bg-gray-50 dark:bg-sidebar-hover/50 border border-gray-200 dark:border-sidebar-hover rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 bg-white dark:bg-sidebar-hover border border-gray-200 dark:border-gray-700 rounded shadow-2xs">
              <Command className="w-3 h-3" /> K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right side: Actions & Placeholders */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button trigger placeholder */}
        <button
          onClick={() => alert('Search modal placeholder')}
          className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-sidebar-hover transition-colors sm:hidden cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-sidebar-hover transition-colors duration-150 cursor-pointer"
          aria-label="Toggle Theme"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Notifications placeholder */}
        <NotificationBell />

        <div className="h-6 w-px bg-gray-200 dark:bg-sidebar-hover mx-1 hidden sm:block" />

        {/* User Profile placeholder */}
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Navbar;
