import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import MobileSidebar from '@/components/layout/MobileSidebar';
import Navbar from '@/components/layout/Navbar';
import MainContentWrapper from '@/components/layout/MainContentWrapper';
import Footer from '@/components/layout/Footer';

const MainLayout = () => {
  // Persist sidebar collapse state in localStorage
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('assetflow_sidebar_collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('assetflow_sidebar_collapsed', JSON.stringify(isSidebarCollapsed));
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [isSidebarCollapsed]);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Desktop & Tablet Sidebar (Collapsible) */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />

      {/* Mobile Drawer Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Container Column */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Scrollable Main Content & Footer */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          <MainContentWrapper>
            <Outlet />
          </MainContentWrapper>

          {/* Enterprise Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
