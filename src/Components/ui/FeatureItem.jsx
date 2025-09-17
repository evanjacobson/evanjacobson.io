import React from 'react';

export function FeatureItem({
  title,
  description,
  accentColor = "emerald-500",
  padding = "p-6",
  className = ""
}) {
  const borderColorClasses = {
    'emerald-500': 'border-l-emerald-500',
    'blue-500': 'border-l-blue-500',
    'purple-500': 'border-l-purple-500',
    'purple-600': 'border-l-purple-600',
    'cyan-500': 'border-l-cyan-500',
    'amber-500': 'border-l-amber-500',
    'green-500': 'border-l-green-500'
  };

  const borderColor = borderColorClasses[accentColor] || borderColorClasses['emerald-500'];

  return (
    <div className={`bg-slate-900/60 border border-slate-700 border-l-4 ${borderColor} rounded-xl ${padding} ${className}`}>
      <h3 className="text-lg font-semibold text-slate-50 mb-2">
        {title}
      </h3>
      <p className="text-slate-300 text-sm">
        {description}
      </p>
    </div>
  );
}

export function FeatureList({ children, className = "" }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  );
}