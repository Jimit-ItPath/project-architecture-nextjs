import { useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { semanticColors } from './colors';

/**
 * Hook to access semantic colors from the theme
 */
export function useSemanticColors() {
  const theme = useMantineTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return default semantic colors on server-side rendering
  if (!isClient) {
    return semanticColors;
  }

  return theme.other?.semanticColors || semanticColors;
}

/**
 * Hook to access custom transitions
 */
export function useTransitions() {
  const theme = useMantineTheme();
  return theme.other?.transitions || {};
}

/**
 * Hook to access custom z-index values
 */
export function useZIndex() {
  const theme = useMantineTheme();
  return theme.other?.zIndex || {};
}

/**
 * Utility function to get color value with shade
 */
export function getThemeColor(theme: any, color: string, shade: number = 5) {
  return theme.colors[color]?.[shade] || color;
}

/**
 * Utility function to create consistent spacing
 */
export function createSpacing(multiplier: number, _theme: any) {
  const baseSpacing = 16; // md spacing
  return `${baseSpacing * multiplier}px`;
}

/**
 * Responsive font size utility
 */
export function getResponsiveFontSize(
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  theme: any
) {
  return theme.fontSizes[size] || theme.fontSizes.md;
}

/**
 * Get shadow with prefix for better type safety
 */
export function getShadow(theme: any, size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
  return theme.shadows[size] || theme.shadows.sm;
}

/**
 * Create consistent border radius
 */
export function getBorderRadius(
  theme: any,
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
) {
  return theme.radius[size] || theme.radius.md;
}
