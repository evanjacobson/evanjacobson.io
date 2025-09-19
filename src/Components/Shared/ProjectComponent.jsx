import { Card, CardHeader, CardContent } from '@/Components/ui/Card';
import { Badge, BadgeGroup } from '@/Components/ui/Badge';
import { ArrowUpRight } from 'lucide-react';
import { getProjectColors } from '@/utils/colorUtils';

export function ProjectComponent({
    title,
    status,
    statusColor = "red-400",
    description,
    techStack = [],
    accentColor = "red",
    gradientFrom = "red-500",
    gradientTo = "red-600",
    icon: Icon,
    date,
    buttons = [],
    href,
    target = "_blank",
    rel = "noopener noreferrer"
}) {
    // Get color classes based on accent color
    const colors = getProjectColors(accentColor);
    return (
        <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 overflow-hidden hover:bg-slate-800/70 hover:border-slate-600/50 hover:-translate-y-2 transition-all duration-500">
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} via-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>

            {/* Top Accent Line */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} rounded-t-3xl`}></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center shadow-lg ${colors.shadow}`}>
                            {Icon && <Icon className="w-6 h-6 text-white" />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-50 group-hover:text-white transition-colors">{title}</h3>
                            <p className={`${colors.status} text-sm font-medium`}>{status}</p>
                        </div>
                    </div>
                    {date && (
                        <div className="text-slate-400 text-sm font-medium">
                            {date}
                        </div>
                    )}
                </div>

                {/* Description */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                    {description}
                </p>

                {/* Tech Stack */}
                {techStack.length > 0 && (
                    <BadgeGroup accentColor={accentColor} className="mb-8">
                        {techStack.map((tech, index) => (
                            <Badge key={index} color="slate">{tech}</Badge>
                        ))}
                    </BadgeGroup>
                )}

                {/* CTA Buttons */}
                {(buttons.length > 0 || href) && (
                    <div className="flex flex-wrap gap-3">
                        {buttons.map((button, index) => {
                            // Get button colors - use override or default
                            const buttonColors = button.colorOverride ? getProjectColors(button.colorOverride) : colors;
                            const ButtonIcon = button.icon;
                            const isDisabled = button.disabled;
                            
                            const buttonClasses = isDisabled
                                ? `inline-flex items-center gap-3 bg-slate-600 text-slate-400 px-6 py-3 rounded-2xl font-semibold text-sm cursor-not-allowed opacity-60`
                                : `inline-flex items-center gap-3 bg-gradient-to-r ${buttonColors.gradient} text-white px-6 py-3 rounded-2xl font-semibold text-sm ${buttonColors.gradientHover} hover:shadow-lg ${buttonColors.shadowHover} transition-all duration-300 group/btn`;
                            
                            if (isDisabled) {
                                return (
                                    <span
                                        key={index}
                                        className={buttonClasses}
                                    >
                                        {ButtonIcon && <ButtonIcon className="w-4 h-4" />}
                                        <span>{button.text}</span>
                                    </span>
                                );
                            }
                            
                            return (
                                <a
                                    key={index}
                                    href={button.href}
                                    target={button.target || target}
                                    rel={button.rel || rel}
                                    className={buttonClasses}
                                >
                                    {ButtonIcon && <ButtonIcon className="w-4 h-4" />}
                                    <span>{button.text}</span>
                                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </a>
                            );
                        })}
                        {href && (
                            <a 
                                href={href} 
                                target={target} 
                                rel={rel} 
                                className={`inline-flex items-center gap-3 bg-gradient-to-r ${colors.gradient} text-white px-6 py-3 rounded-2xl font-semibold text-sm ${colors.gradientHover} hover:shadow-lg ${colors.shadowHover} transition-all duration-300 group/btn`}
                            >
                                <span>Visit {title}</span>
                                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
