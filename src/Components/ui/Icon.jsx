import React from 'react';

export function Icon({
  icon: IconComponent,
  size = "w-6 h-6",
  color = "text-current",
  className = ""
}) {
  if (!IconComponent) {
    console.warn(`Icon component not provided`);
    return null;
  }

  return (
    <IconComponent className={`${size} ${color} ${className}`} />
  );
}