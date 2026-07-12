import React from 'react';
import { Shield, ExternalLink, Activity } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4 mt-auto shrink-0">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        {/* Left side: Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-gray-700">
            <Shield className="w-4 h-4 text-primary-600" />
            <span>AssetFlow ERP</span>
          </div>
          <span>&copy; {currentYear} Enterprise Resource Platform. All rights reserved.</span>
        </div>

        {/* Middle/Right: System Health & Links */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-gray-600">System Operational</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#documentation"
              className="hover:text-primary-600 transition-colors inline-flex items-center gap-1"
            >
              <span>Documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="#support"
              className="hover:text-primary-600 transition-colors inline-flex items-center gap-1"
            >
              <span>Support Desk</span>
            </a>
            <span className="text-gray-300">|</span>
            <span className="font-mono text-[11px] text-gray-400">v1.0.0-PROD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
