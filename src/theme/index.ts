import { createTheme, MantineThemeOverride, rem } from '@mantine/core';
import { customColors, semanticColors } from './colors';

// Typography configuration
const typography = {
  fontFamily:
    'var(--font-poppins, "Poppins"), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif',
  fontFamilyMonospace:
    'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  // Font sizes with consistent scale
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },

  // Line heights
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.65',
  },

  // Heading configuration
  headings: {
    fontFamily:
      'var(--font-poppins, "Poppins"), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif',
    fontWeight: '600',
    textWrap: 'balance' as const,
    sizes: {
      h1: { fontSize: rem(36), lineHeight: '1.2', fontWeight: '700' },
      h2: { fontSize: rem(30), lineHeight: '1.25', fontWeight: '600' },
      h3: { fontSize: rem(24), lineHeight: '1.3', fontWeight: '600' },
      h4: { fontSize: rem(20), lineHeight: '1.35', fontWeight: '600' },
      h5: { fontSize: rem(18), lineHeight: '1.4', fontWeight: '500' },
      h6: { fontSize: rem(16), lineHeight: '1.45', fontWeight: '500' },
    },
  },
};

// Spacing configuration
const spacing = {
  xs: rem(8),
  sm: rem(12),
  md: rem(16),
  lg: rem(24),
  xl: rem(32),
  xxl: rem(48),
};

// Radius configuration
const radius = {
  xs: rem(2),
  sm: rem(4),
  md: rem(8),
  lg: rem(12),
  xl: rem(16),
};

// Shadow configuration
const shadows = {
  xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
};

// Component customizations
const components = {
  Button: {
    defaultProps: {
      radius: 'md',
    },
    styles: {
      root: {
        fontWeight: 500,
        transition: 'all 0.2s ease',
        border: '1px solid transparent',

        '&:hover': {
          transform: 'translateY(-1px)',
        },

        '&:active': {
          transform: 'translateY(0)',
        },
      },
    },
  },

  Card: {
    defaultProps: {
      radius: 'md', // changed from 'lg' to 'md'
      padding: 'lg',
    },
    styles: {
      root: {
        transition: 'all 0.2s ease',

        '&:hover': {
          transform: 'translateY(-2px)',
        },
      },
    },
  },

  TextInput: {
    defaultProps: {
      radius: 'md',
    },
    styles: {
      input: {
        transition: 'all 0.2s ease',

        '&:focus': {
          boxShadow: `0 0 0 1px var(--mantine-primary-color-5)`,
        },
      },
    },
  },

  Paper: {
    defaultProps: {
      radius: 'md',
    },
  },

  Badge: {
    defaultProps: {
      radius: 'md',
      variant: 'light',
    },
    styles: {
      root: {
        fontWeight: 500,
        textTransform: 'none',
      },
    },
  },

  Notification: {
    defaultProps: {
      radius: 'md',
    },
    styles: {
      root: {
        borderLeft: `4px solid var(--mantine-primary-color-5)`,
      },
    },
  },

  Modal: {
    defaultProps: {
      radius: 'md', // changed from 'lg' to 'md'
      centered: true,
    },
  },

  Loader: {
    defaultProps: {
      type: 'dots',
      color: 'blue',
    },
  },

  Text: {
    styles: {
      root: {
        lineHeight: 1.55,
      },
    },
  },

  Title: {
    styles: {
      root: {
        fontWeight: 600,
      },
    },
  },
};

// Main theme configuration
export const customTheme: MantineThemeOverride = createTheme({
  // Color configuration
  colors: customColors,
  primaryColor: 'blue',
  primaryShade: { light: 5, dark: 6 },

  // Typography
  fontFamily: typography.fontFamily,
  fontFamilyMonospace: typography.fontFamilyMonospace,
  fontSizes: typography.fontSizes,
  lineHeights: typography.lineHeights,
  headings: typography.headings,

  // Layout
  spacing,
  radius,
  shadows,

  // Components
  components,

  // Other theme properties
  defaultRadius: 'md',
  cursorType: 'pointer',
  focusRing: 'auto',

  // Breakpoints
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },

  // White and black colors
  white: '#FFFFFF',
  black: '#000000',

  // Other configuration
  other: {
    // Custom semantic colors
    semanticColors,

    // Animation durations
    transitions: {
      fast: '150ms',
      medium: '250ms',
      slow: '350ms',
    },

    // Custom z-index values
    zIndex: {
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      notification: 1070,
    },
  },
});

// Dark theme variant
export const darkTheme: MantineThemeOverride = createTheme({
  ...customTheme,
  colors: {
    ...customColors,
    dark: [
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
    ],
  },
  white: '#FFFFFF',
  black: '#000000',
  other: {
    ...customTheme.other,
    semanticColors: {
      ...semanticColors,
      textPrimary: '#C1C2C5',
      textSecondary: '#909296',
      textMuted: '#5C5F66',
      textInverse: '#141517',
      backgroundPrimary: '#1A1B1E',
      backgroundSecondary: '#25262B',
      backgroundTertiary: '#2C2E33',
      backgroundDark: '#141517',
      backgroundDarkSecondary: '#101113',
      borderLight: '#373A40',
      borderMedium: '#5C5F66',
      borderDark: '#909296',
      surfaceElevated: '#25262B',
      surfaceHover: '#2C2E33',
      surfacePressed: '#373A40',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
  },
});

export default customTheme;
