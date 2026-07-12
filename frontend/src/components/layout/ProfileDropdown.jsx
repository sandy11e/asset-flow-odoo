import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, Shield, ChevronDown, CheckCircle2 } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { useClickOutside } from '@/hooks/useClickOutside';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Use custom hook instead of duplicate useEffect
  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-gray-100 transition-colors duration-150 focus:outline-none cursor-pointer group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar name="Priya Sharma" size="sm" className="ring-2 ring-primary-500/20 group-hover:ring-primary-500/50 transition-all" />
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold text-gray-800 leading-tight">
            Priya Sharma
          </span>
          <span className="text-[10px] text-gray-500 font-medium">
            Asset Manager
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 hidden sm:block ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-100 py-2 z-50 divide-y divide-gray-100"
          >
            {/* User Info Header */}
            <div className="px-4 py-3">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                Signed in as
              </p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                priya.sharma@assetflow.com
              </p>
              <div className="mt-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-medium w-fit">
                <Shield className="w-3.5 h-3.5" />
                <span>Role: Asset Manager</span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <a
                href="#profile"
                onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
              >
                <User className="w-4 h-4 text-gray-400" />
                <span>My Profile (Placeholder)</span>
              </a>
              <a
                href="#settings"
                onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
              >
                <Settings className="w-4 h-4 text-gray-400" />
                <span>Account Preferences</span>
              </a>
            </div>

            {/* System Status / Logout */}
            <div className="pt-1">
              <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500">
                <span>Session Status</span>
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  alert('Logout placeholder triggered');
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
