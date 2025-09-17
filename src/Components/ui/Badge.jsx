import React from 'react';

export function Badge({
  children,
  icon: Icon = null,
  color,
  variant,
  size = "default",
  className
}) {
  const colorClasses = {
    'emerald-500': 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    'blue-500': 'bg-blue-500/15 border-blue-500/30 text-blue-300',
    'purple-500': 'bg-purple-500/15 border-purple-500/30 text-purple-300',
    'purple-600': 'bg-purple-600/15 border-purple-600/30 text-purple-300',
    'cyan-500': 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
    'amber-500': 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    'green-500': 'bg-green-500/15 border-green-500/30 text-green-300',
    'slate': 'bg-slate-900/50 border border-slate-600/50 text-slate-300',
  };

  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-xs',
    large: 'px-4 py-2 text-sm'
  };

  console.log(color);
  const baseClasses = "border rounded-full font-medium inline-flex items-center";
  const colorClass = colorClasses[color] || colorClasses['emerald-500'];
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