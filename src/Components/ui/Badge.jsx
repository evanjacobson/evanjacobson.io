import React from 'react';
import { getBadgeColors } from '@/utils/colorUtils';

export function Badge({
  children,
  icon: Icon = null,
  color,
  variant,
  size = "default",
  className
}) {
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-xs',
    large: 'px-4 py-2 text-sm'
  };

  const baseClasses = "border rounded-full font-medium inline-flex items-center";
  
  // Handle special case for slate color
  const colorClass = color === 'slate' 
    ? 'bg-slate-900/50 border border-slate-600/50 text-slate-300'
    : (() => {
        const badgeColors = getBadgeColors(color);
        return `${badgeColors.bg} ${badgeColors.border} ${badgeColors.text}`;
      })();
  
  const sizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <span className={`${baseClasses} ${colorClass} ${sizeClass} ${className}`}>
      {Icon && (
        <Icon className="w-4 h-4 mr-1.5 -ml-0.5" aria-hidden="true" />
      )}
      {children}
    </span>
  );
}

export function BadgeGroup({ children, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {children}
    </div>
  );
}