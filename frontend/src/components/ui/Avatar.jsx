import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ name, src, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg'
  };

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full bg-gray-200 overflow-hidden ${sizes[size]} ${className}`}>
      {src ? (
        <img src={src} alt={name || 'Avatar'} className="h-full w-full object-cover" />
      ) : name ? (
        <span className="font-medium text-gray-600">{getInitials(name)}</span>
      ) : (
        <User className="h-1/2 w-1/2 text-gray-400" />
      )}
    </div>
  );
};

export default Avatar;
