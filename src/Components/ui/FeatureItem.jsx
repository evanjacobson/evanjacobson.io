import React from 'react';
import { getFeatureBorderColor } from '@/utils/colorUtils';

export function FeatureItem({
  title,
  description,
  accentColor = "emerald-500",
  padding = "p-6",
  className = ""
}) {
  const borderColor = getFeatureBorderColor(accentColor);

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