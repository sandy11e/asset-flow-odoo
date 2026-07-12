import React from 'react';
import Card from '@/components/ui/Card';
import { History, Building2, Layers, MapPin } from 'lucide-react';

const OrganizationTimeline = ({ className = '' }) => {
  const events = [
    {
      id: 1,
      time: '2 hours ago',
      title: 'New Department Approved',
      description: 'Research & AI Engineering (DEPT-RND) registered under AssetFlow Global.',
      icon: Layers,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
    },
    {
      id: 2,
      time: 'Yesterday at 14:30',
      title: 'Branch Facility Updated',
      description: 'Silicon Valley Hub storage capacity recalibrated to 92% occupancy.',
      icon: MapPin,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
    },
    {
      id: 3,
      time: '3 days ago',
      title: 'Organization Registered',
      description: 'Apex Manufacturing & Robotics submitted registration for audit clearance.',
      icon: Building2,
      color: 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400',
    },
  ];

  return (
    <Card className={`p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-4 ${className}`}>
      <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <History className="w-4 h-4 text-blue-500" />
        <span>Organization Audit Timeline</span>
      </h4>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="relative">
              <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-sidebar-hover ${event.color}`}>
                <Icon className="w-2.5 h-2.5" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-gray-900 dark:text-white">{event.title}</p>
                <span className="text-[10px] text-gray-400">{event.time}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{event.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default OrganizationTimeline;
