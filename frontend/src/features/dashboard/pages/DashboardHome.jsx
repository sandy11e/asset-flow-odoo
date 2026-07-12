import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/features/auth/context/AuthContext';
import { dashboardService } from '../services/dashboard.service';

// UX Components
import { DashboardSkeleton } from '../components/DashboardSkeleton';
import { DashboardFilters } from '../components/DashboardFilters';
import { DateRangeSelector } from '../components/DateRangeSelector';
import { RefreshButton } from '../components/RefreshButton';
import { WelcomeBanner } from '../components/WelcomeBanner';
import { QuickActionsPanel } from '../components/QuickActionsPanel';
import { AnalyticsGrid } from '../components/AnalyticsGrid';
import { DashboardSection } from '../components/DashboardSection';

// Cards & Widgets
import { StatCard } from '../components/StatCard';
import { ProfileSummary } from '../components/ProfileSummary';
import { OrganizationSummary } from '../components/OrganizationSummary';
import { SystemHealth } from '../components/SystemHealth';
import { UpcomingTasks } from '../components/UpcomingTasks';
import { AnnouncementWidget } from '../components/AnnouncementWidget';
import { RecentActivityTimeline } from '../components/RecentActivityTimeline';
import { NotificationsPanel } from '../components/NotificationsPanel';

// Charts
import { ChartContainer } from '../components/ChartContainer';
import { LineChart } from '../components/LineChart';
import { DoughnutChart } from '../components/DoughnutChart';
import { BarChart } from '../components/BarChart';

// Icons
import { Package, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const DashboardHome = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [activities, setActivities] = useState([]);
  
  const loadData = async () => {
    try {
      const [summaryRes, activityRes] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getRecentActivity()
      ]);
      setSummary(summaryRes.data);
      setActivities(activityRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Mock Data for Charts
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Allocations',
        data: [12, 19, 15, 25, 22, 10, 8],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const doughnutData = {
    labels: ['Available', 'Allocated', 'Maintenance', 'Retired'],
    datasets: [
      {
        data: [summary?.availableAssets || 0, summary?.allocatedAssets || 0, summary?.maintenanceAssets || 0, 50],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#94a3b8'],
        borderWidth: 0,
      }
    ]
  };

  const barChartData = {
    labels: ['IT', 'HR', 'Ops', 'Finance', 'Marketing'],
    datasets: [
      {
        label: 'Assets per Department',
        data: [350, 45, 120, 30, 80],
        backgroundColor: '#6366f1',
      }
    ]
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <motion.div 
      className="max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header Area */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of your enterprise resources</p>
        </div>
        <div className="flex items-center gap-2">
          <DashboardFilters />
          <DateRangeSelector />
          <RefreshButton onRefresh={loadData} />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <WelcomeBanner user={user} date={today} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <QuickActionsPanel />
      </motion.div>

      {/* KPI Stats */}
      <motion.div variants={itemVariants}>
        <DashboardSection>
          <AnalyticsGrid columns={4}>
            <StatCard title="Total Assets" value={summary?.totalAssets || 0} icon={Package} trend="up" trendValue="12%" color="primary" />
            <StatCard title="Available" value={summary?.availableAssets || 0} icon={CheckCircle} color="success" />
            <StatCard title="Allocated" value={summary?.allocatedAssets || 0} icon={Clock} color="warning" />
            <StatCard title="Under Maintenance" value={summary?.maintenanceAssets || 0} icon={AlertTriangle} color="danger" />
          </AnalyticsGrid>
        </DashboardSection>
      </motion.div>

      {/* Main Charts & Analytics */}
      <DashboardSection title="Analytics Overview">
        <AnalyticsGrid columns={3}>
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <ChartContainer title="Asset Allocation Trend">
              <LineChart data={lineChartData} />
            </ChartContainer>
          </motion.div>
          <motion.div variants={itemVariants}>
            <ChartContainer title="Asset Distribution">
              <DoughnutChart data={doughnutData} />
            </ChartContainer>
          </motion.div>
        </AnalyticsGrid>
      </DashboardSection>

      {/* Secondary Row */}
      <DashboardSection>
        <AnalyticsGrid columns={3}>
          <motion.div variants={itemVariants}>
            <OrganizationSummary />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ChartContainer title="Department Holdings" height="h-64">
              <BarChart data={barChartData} />
            </ChartContainer>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SystemHealth />
          </motion.div>
        </AnalyticsGrid>
      </DashboardSection>

      {/* Bottom Row - Activity & Tasks */}
      <DashboardSection>
        <AnalyticsGrid columns={3}>
          <motion.div variants={itemVariants}>
            <UpcomingTasks />
            <div className="mt-6">
              <AnnouncementWidget 
                title="System Audit Cycle" 
                message="The Q3 comprehensive asset audit begins next week. Please ensure all transfer requests are resolved." 
                date="Oct 1" 
              />
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <RecentActivityTimeline activities={activities} />
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <ProfileSummary />
            <NotificationsPanel notifications={[
              { type: 'warning', title: 'Overdue Return', message: 'Laptop AF-0114 is 2 days overdue.', time: '10m ago' },
              { type: 'success', title: 'Maintenance Completed', message: 'Projector RM-2 has been fixed.', time: '2h ago' }
            ]} />
          </motion.div>
        </AnalyticsGrid>
      </DashboardSection>
    </motion.div>
  );
};

export default DashboardHome;
