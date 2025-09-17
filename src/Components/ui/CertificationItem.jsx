import React from 'react';
import { Badge, BadgeGroup } from './Badge';

export function CertificationItem({
  title,
  issuer,
  dateEarned,
  expirationDate,
  credentialId,
  verificationUrl,
  skills = [],
  accentColor = "green-500",
  showBorder = true,
  className = ""
}) {
  return (
    <div className={`${showBorder ? 'border-b border-slate-700 pb-6' : ''} ${className}`}>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-50">{title}</h3>
          <p className={`text-lg text-${accentColor} font-medium`}>{issuer}</p>
        </div>
        <div className="text-sm text-slate-400 lg:text-right">
          <p>Earned: {dateEarned}</p>
          {expirationDate && <p>Expires: {expirationDate}</p>}
        </div>
      </div>

      {credentialId && (
        <div className="text-slate-300 mb-4">
          <p className="text-sm">
            <span className="text-slate-400">Credential ID:</span> {credentialId}
          </p>
          {verificationUrl && (
            <a
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm text-${accentColor} hover:text-${accentColor.replace('500', '400')} transition-colors underline`}
            >
              Verify Credential
            </a>
          )}
        </div>
      )}

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

export function CertificationList({ children, className = "" }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {children}
    </div>
  );
}