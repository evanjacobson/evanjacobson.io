import React from 'react';
import { Icon } from './Icon';

export function ContactItem({
  icon,
  label,
  value,
  href,
  accentColor = "amber-500",
  className = ""
}) {
  const iconColorClasses = {
    'emerald-500': 'text-emerald-500',
    'blue-500': 'text-blue-500',
    'purple-500': 'text-purple-500',
    'purple-600': 'text-purple-600',
    'cyan-500': 'text-cyan-500',
    'amber-500': 'text-amber-500',
    'green-500': 'text-green-500'
  };

  const hoverBorderClasses = {
    'emerald-500': 'hover:border-emerald-500',
    'blue-500': 'hover:border-blue-500',
    'purple-500': 'hover:border-purple-500',
    'purple-600': 'hover:border-purple-600',
    'cyan-500': 'hover:border-cyan-500',
    'amber-500': 'hover:border-amber-500',
    'green-500': 'hover:border-green-500'
  };

  const hoverTextClasses = {
    'emerald-500': 'hover:text-emerald-400',
    'blue-500': 'hover:text-blue-400',
    'purple-500': 'hover:text-purple-400',
    'purple-600': 'hover:text-purple-400',
    'cyan-500': 'hover:text-cyan-400',
    'amber-500': 'hover:text-amber-400',
    'green-500': 'hover:text-green-400'
  };

  const iconColor = iconColorClasses[accentColor] || iconColorClasses['amber-500'];
  const hoverBorderColor = hoverBorderClasses[accentColor] || hoverBorderClasses['amber-500'];
  const hoverTextColor = hoverTextClasses[accentColor] || hoverTextClasses['amber-500'];

  const content = (
    <div className={`flex items-center gap-4 p-4 bg-slate-900/40 border border-slate-700 rounded-xl transition-all duration-300 hover:bg-slate-900/80 ${hoverBorderColor} hover:-translate-y-0.5 ${className}`}>
      <Icon
        icon={icon}
        size="w-6 h-6"
        color={iconColor}
        className="flex-shrink-0"
      />
      <div>
        <h4 className="font-semibold text-slate-50 mb-1">{label}</h4>
        <div className={`text-slate-400 text-sm ${hoverTextColor} transition-colors`}>
          {value}
        </div>
      </div>
    </div>
  );

  const isExternal = href && href.startsWith('http');
  return (
    <a
      href={href || '#'}
      className="block"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}