import React from 'react';

export function Card({
  children,
  className = "",
  padding = "p-8",
  accentColor = "emerald-500",
  variant = "section"
}) {
  const baseClasses = "bg-slate-800 border border-slate-700 rounded-2xl relative overflow-hidden";

  return (
    <section className={`${baseClasses} ${padding} ${className}`}>
      {variant === "section" && (
        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-${accentColor} opacity-80`}></div>
      )}
      {children}
    </section>
  );
}

export function CardHeader({
  icon,
  title,
  accentColor = "emerald-500",
  className = ""
}) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <div className={`w-7 h-7 fill-${accentColor}`}>
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-slate-50">{title}</h2>
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}