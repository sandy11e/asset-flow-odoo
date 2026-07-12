import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  Package,
  UserCheck,
  ArrowRightLeft,
  CalendarDays,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Bell,
  User,
  Settings,
  X,
  ShieldCheck,
} from 'lucide-react';
import { ROUTES } from '@/routes/routes';

const navigationItems = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Organization', href: '/organization', icon: Building2 },
  { name: 'Assets', href: ROUTES.ASSETS, icon: Package },
  { name: 'Allocation', href: '/allocation', icon: UserCheck },
  { name: 'Transfer', href: '/transfer', icon: ArrowRightLeft },
  { name: 'Booking', href: ROUTES.BOOKINGS, icon: CalendarDays },
  { name: 'Maintenance', href: ROUTES.MAINTENANCE, icon: Wrench },
  { name: 'Audit', href: ROUTES.AUDITS, icon: ClipboardCheck },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: ROUTES.SETTINGS, icon: Settings },
];

const MobileSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-xs md:hidden"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar-bg text-sidebar-text flex flex-col shadow-2xl md:hidden"
          >
            {/* Brand Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-hover shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center shrink-0 shadow-md">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-wide text-white">
                    AssetFlow
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-primary-400 uppercase">
                    Enterprise ERP
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-sidebar-hover transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Navigation
              </div>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-sidebar-hover shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold text-sm">
                  EM
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-white truncate">
                    Employee User
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    employee@assetflow.com
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
