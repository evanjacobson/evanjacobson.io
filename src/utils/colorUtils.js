// Base color definitions
const baseColors = {
  emerald: { 500: 'emerald-500', 600: 'emerald-600', 400: 'emerald-400' },
  blue: { 500: 'blue-500', 600: 'blue-600', 400: 'blue-400' },
  purple: { 500: 'purple-500', 600: 'purple-600', 400: 'purple-400' },
  cyan: { 500: 'cyan-500', 600: 'cyan-600', 400: 'cyan-400' },
  amber: { 500: 'amber-500', 600: 'amber-600', 400: 'amber-400' },
  green: { 500: 'green-500', 600: 'green-600', 400: 'green-400' },
  red: { 500: 'red-500', 600: 'red-600', 400: 'red-400' },
  orange: { 500: 'orange-500', 600: 'orange-600', 400: 'orange-400' },
  slate: { 500: 'slate-500', 600: 'slate-600', 400: 'slate-400' }
};

// Helper function to get color with shade
const getColor = (colorName, shade = 500) => {
  return baseColors[colorName]?.[shade] || baseColors.emerald[500];
};

// Helper function to create gradient classes
const createGradient = (colorName, fromShade = 500, toShade = 600) => {
  return `from-${getColor(colorName, fromShade)} to-${getColor(colorName, toShade)}`;
};

// Helper function to create background with opacity
const createBgWithOpacity = (colorName, opacity = 15) => {
  return `bg-${getColor(colorName, 500)}/${opacity}`;
};

// Helper function to create border with opacity
const createBorderWithOpacity = (colorName, opacity = 30) => {
  return `border-${getColor(colorName, 500)}/${opacity}`;
};

// Helper function to create text color
const createTextColor = (colorName, shade = 300) => {
  return `text-${getColor(colorName, shade)}`;
};

// Helper function to create shadow with opacity
const createShadowWithOpacity = (colorName, opacity = 30) => {
  return `shadow-${getColor(colorName, 500)}/${opacity}`;
};

// Project Component Color Mappings - Static for Tailwind purging
export const projectColors = {
  red: {
    bg: 'from-red-500/5 to-red-600/5',
    gradient: 'from-red-500 to-red-600',
    gradientHover: 'hover:from-red-600 hover:to-red-700',
    shadow: 'shadow-red-500/30',
    shadowHover: 'hover:shadow-red-500/25',
    status: 'text-red-400'
  },
  blue: {
    bg: 'from-blue-500/5 to-blue-600/5',
    gradient: 'from-blue-500 to-blue-600',
    gradientHover: 'hover:from-blue-600 hover:to-blue-700',
    shadow: 'shadow-blue-500/30',
    shadowHover: 'hover:shadow-blue-500/25',
    status: 'text-blue-400'
  },
  green: {
    bg: 'from-green-500/5 to-green-600/5',
    gradient: 'from-green-500 to-green-600',
    gradientHover: 'hover:from-green-600 hover:to-green-700',
    shadow: 'shadow-green-500/30',
    shadowHover: 'hover:shadow-green-500/25',
    status: 'text-green-400'
  },
  purple: {
    bg: 'from-purple-500/5 to-purple-600/5',
    gradient: 'from-purple-500 to-purple-600',
    gradientHover: 'hover:from-purple-600 hover:to-purple-700',
    shadow: 'shadow-purple-500/30',
    shadowHover: 'hover:shadow-purple-500/25',
    status: 'text-purple-400'
  },
  orange: {
    bg: 'from-orange-500/5 to-orange-600/5',
    gradient: 'from-orange-500 to-orange-600',
    gradientHover: 'hover:from-orange-600 hover:to-orange-700',
    shadow: 'shadow-orange-500/30',
    shadowHover: 'hover:shadow-orange-500/25',
    status: 'text-orange-400'
  },
  slate: {
    bg: 'from-slate-700/5 to-slate-800/5',
    gradient: 'from-slate-700 to-slate-800',
    gradientHover: 'hover:from-slate-800 hover:to-slate-900',
    shadow: 'shadow-slate-700/30',
    shadowHover: 'hover:shadow-slate-700/25',
    status: 'text-slate-400'
  }
};

export const getProjectColors = (colorName = 'red') => {
  return projectColors[colorName.toLowerCase()] || projectColors.red;
};

// Badge Component Color Mappings
export const getBadgeColors = (colorName = 'emerald-500') => {
  // Handle both "emerald-500" and "emerald" formats
  const [color, shade] = colorName.includes('-') 
    ? colorName.split('-') 
    : [colorName, '500'];
  
  return {
    bg: createBgWithOpacity(color, 15),
    border: createBorderWithOpacity(color, 30),
    text: createTextColor(color, 300)
  };
};

// Feature Item Border Color Mappings
export const getFeatureBorderColor = (colorName = 'emerald-500') => {
  const [color, shade] = colorName.includes('-') 
    ? colorName.split('-') 
    : [colorName, '500'];
  
  return `border-l-${getColor(color, shade)}`;
};

// Card Component Color Mappings
export const cardAccentColors = {
  'emerald-500': 'bg-emerald-500',
  'blue-500': 'bg-blue-500',
  'purple-500': 'bg-purple-500',
  'purple-600': 'bg-purple-600',
  'cyan-500': 'bg-cyan-500',
  'amber-500': 'bg-amber-500',
  'green-500': 'bg-green-500',
  'red-500': 'bg-red-500',
  'orange-500': 'bg-orange-500'
};

export const cardFillColors = {
  'emerald-500': 'fill-emerald-500',
  'blue-500': 'fill-blue-500',
  'purple-500': 'fill-purple-500',
  'purple-600': 'fill-purple-600',
  'cyan-500': 'fill-cyan-500',
  'amber-500': 'fill-amber-500',
  'green-500': 'fill-green-500',
  'red-500': 'fill-red-500',
  'orange-500': 'fill-orange-500'
};

export const getCardColors = (colorName = 'emerald-500') => {
  const [color, shade] = colorName.includes('-') 
    ? colorName.split('-') 
    : [colorName, '500'];
  
  return {
    border: `border-${getColor(color, shade)}/20`,
    borderHover: `hover:border-${getColor(color, shade)}/40`,
    shadow: createShadowWithOpacity(color, 20),
    shadowHover: `hover:shadow-${getColor(color, 500)}/30`
  };
};

// Available color names for validation
export const availableColors = Object.keys(baseColors);

// Color validation helper
export const isValidColor = (colorName) => {
  if (colorName.includes('-')) {
    const [color, shade] = colorName.split('-');
    return baseColors[color] && baseColors[color][shade];
  }
  return baseColors[colorName];
};

// Get all available color variants for a base color
export const getColorVariants = (colorName) => {
  return baseColors[colorName] || {};
};

// Export base colors for direct access if needed
export { baseColors, getColor, createGradient, createBgWithOpacity, createBorderWithOpacity, createTextColor, createShadowWithOpacity };
