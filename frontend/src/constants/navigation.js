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
} from 'lucide-react';
import { ROUTES } from '@/routes/routes';

export const NAVIGATION_ITEMS = [
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

export default NAVIGATION_ITEMS;
