import React from 'react';
import { Badge, BadgeGroup } from './Badge';

export function ExperienceItem({
  title,
  company,
  dateRange,
  description,
  skills = [],
  accentColor = "purple-500",
  showBorder = true,
  className = ""
}) {
  return (
    <div className={`${showBorder ? 'border-b border-slate-700 pb-6' : ''} ${className}`}>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-50">{title}</h3>
          <p className={`text-lg text-${accentColor} font-medium`}>{company}</p>
        </div>
        <p className="text-sm text-slate-400 lg:text-right">{dateRange}</p>
      </div>
      <div className="text-slate-300 mb-4">
        {Array.isArray(description) ? (
          <ul className="space-y-2">
            {description.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-slate-400 mt-1.5 text-xs">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>{description}</p>
        )}
      </div>
      {skills.length > 0 && (
        <BadgeGroup>
          {skills.map((skill, index) => (
            <Badge key={index} color={accentColor}>
              {skill}
            </Badge>
          ))}
        </BadgeGroup>
      )}
    </div>
  );
}

export function ExperienceList({ children, className = "" }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {children}
    </div>
  );
}