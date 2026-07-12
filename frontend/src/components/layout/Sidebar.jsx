import React from 'react';
import { NavLink } from 'react-router-dom';
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
  ChevronLeft,
  ChevronRight,
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

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  return (
    <aside
      className={`hidden md:flex flex-col bg-sidebar-bg text-sidebar-text border-r border-sidebar-hover transition-all duration-300 ease-in-out shrink-0 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-hover shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-lg tracking-wide text-white truncate">
                AssetFlow
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-primary-400 uppercase">
                Enterprise ERP
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-sidebar-hover scrollbar-track-transparent">
        {!isCollapsed && (
          <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Navigation
          </div>
        )}
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 group relative ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
                }`
              }
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="w-5 h-5 shrink-0 transition-transform duration-150 group-hover:scale-110" />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
              {isCollapsed && (
                <span className="absolute left-full ml-3 px-2.5 py-1 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Sidebar Footer / Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-hover shrink-0">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-gray-400 hover:bg-sidebar-hover hover:text-white transition-colors duration-150 text-sm font-medium cursor-pointer"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse View</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
