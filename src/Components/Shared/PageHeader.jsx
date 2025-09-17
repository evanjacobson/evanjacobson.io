import React from "react";

export function PageHeader({ title, description }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <p className="text-slate-400 mt-1">{description}</p>
        </div>
    </div>
  );
}