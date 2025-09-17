import React from 'react';
import { Badge, BadgeGroup } from './Badge';

export function TechStackCategory({
  title,
  skills = [],
  accentColor = "cyan-500",
  className = ""
}) {
  return (
    <div className={`bg-slate-900/40 border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:bg-slate-900/80 hover:border-${accentColor} hover:-translate-y-0.5 ${className}`}>
      <h4 className={`text-${accentColor} font-semibold mb-4`}>{title}</h4>
      <BadgeGroup>
        {skills.map((skill, index) => (
          <Badge key={index} color={accentColor}>
            {skill}
          </Badge>
        ))}
      </BadgeGroup>
    </div>
  );
}

export function TechStackGrid({ children, className = "" }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {children}
    </div>
  );
}