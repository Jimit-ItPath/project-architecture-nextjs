import { MantineColorsTuple } from '@mantine/core';

// Primary brand colors - Modern blue palette
export const primaryColors: MantineColorsTuple = [
  '#E7F5FF',
  '#D0EBFF',
  '#A5D8FF',
  '#74C0FC',
  '#339AF0',
  '#228BE6',
  '#1C7ED6',
  '#1971C2',
  '#1864AB',
  '#145A94',
];

// Secondary colors - Sophisticated purple palette
export const secondaryColors: MantineColorsTuple = [
  '#F3F0FF',
  '#E5DBFF',
  '#D0BFFF',
  '#B197FC',
  '#9775FA',
  '#845EF7',
  '#7950F2',
  '#7048E8',
  '#6741D9',
  '#5F3DC4',
];

// Accent colors - Vibrant teal palette
export const accentColors: MantineColorsTuple = [
  '#E6FCFF',
  '#C3FAFE',
  '#A5F3FC',
  '#67E8F9',
  '#22D3EE',
  '#06B6D4',
  '#0891B2',
  '#0E7490',
  '#155E75',
  '#164E63',
];

// Success colors - Fresh green palette
export const successColors: MantineColorsTuple = [
  '#ECFDF5',
  '#D1FAE5',
  '#A7F3D0',
  '#6EE7B7',
  '#34D399',
  '#10B981',
  '#059669',
  '#047857',
  '#065F46',
  '#064E3B',
];

// Warning colors - Warm orange palette
export const warningColors: MantineColorsTuple = [
  '#FFFBEB',
  '#FEF3C7',
  '#FDE68A',
  '#FCD34D',
  '#FBBF24',
  '#F59E0B',
  '#D97706',
  '#B45309',
  '#92400E',
  '#78350F',
];

// Error colors - Bold red palette
export const errorColors: MantineColorsTuple = [
  '#FEF2F2',
  '#FEE2E2',
  '#FECACA',
  '#FCA5A5',
  '#F87171',
  '#EF4444',
  '#DC2626',
  '#B91C1C',
  '#991B1B',
  '#7F1D1D',
];

// Neutral colors - Modern gray palette
export const neutralColors: MantineColorsTuple = [
  '#FAFAFA',
  '#F4F4F5',
  '#E4E4E7',
  '#D4D4D8',
  '#A1A1AA',
  '#71717A',
  '#52525B',
  '#3F3F46',
  '#27272A',
  '#18181B',
];

// Dark theme colors - Rich dark palette
export const darkColors: MantineColorsTuple = [
  '#C1C2C5',
  '#A6A7AB',
  '#909296',
  '#5C5F66',
  '#373A40',
  '#2C2E33',
  '#25262B',
  '#1A1B1E',
  '#141517',
  '#101113',
];

// Combine all color palettes
export const customColors = {
  primary: primaryColors,
  secondary: secondaryColors,
  accent: accentColors,
  success: successColors,
  warning: warningColors,
  error: errorColors,
  neutral: neutralColors,
  dark: darkColors,

  // Mantine's default color names mapped to our custom palette
  blue: primaryColors,
  grape: secondaryColors,
  teal: accentColors,
  green: successColors,
  orange: warningColors,
  red: errorColors,
  gray: neutralColors,
};

// Semantic color mappings
export const semanticColors = {
  // Text colors
  textPrimary: '#18181B',
  textSecondary: '#71717A',
  textMuted: '#A1A1AA',
  textInverse: '#FAFAFA',

  // Background colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#FAFAFA',
  backgroundTertiary: '#F4F4F5',
  backgroundDark: '#18181B',
  backgroundDarkSecondary: '#27272A',

  // Border colors
  borderLight: '#E4E4E7',
  borderMedium: '#D4D4D8',
  borderDark: '#71717A',

  // Surface colors
  surfaceElevated: '#FFFFFF',
  surfaceHover: '#F4F4F5',
  surfacePressed: '#E4E4E7',

  // State colors
  focusRing: '#339AF0',
  selection: '#A5D8FF',
  overlay: 'rgba(0, 0, 0, 0.5)',
};
