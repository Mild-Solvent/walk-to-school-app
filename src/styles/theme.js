// Modern Purple Theme Configuration
// Based on palette_template.css

export const colors = {
  // Primary purple shades
  russianViolet: '#10002b',
  russianViolet2: '#240046',
  persianIndigo: '#3c096c',
  tekhelet: '#5a189a',
  frenchViolet: '#7b2cbf',
  amethyst: '#9d4edd',
  heliotrope: '#c77dff',
  mauve: '#e0aaff',
  
  // Semantic colors
  primary: '#5a189a',
  primaryDark: '#3c096c',
  primaryLight: '#7b2cbf',
  background: '#240046',
  surface: '#3c096c',
  surfaceLight: '#5a189a',
  accent: '#c77dff',
  accentLight: '#e0aaff',
  
  // UI colors
  text: '#ffffff',
  textSecondary: '#e0aaff',
  textMuted: '#c77dff',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  
  // Transparent overlays
  overlay: 'rgba(16, 0, 43, 0.85)',
  overlayLight: 'rgba(60, 9, 108, 0.95)',
  blur: 'rgba(90, 24, 154, 0.7)',
};

export const gradients = {
  primary: ['#240046', '#5a189a', '#7b2cbf'],
  secondary: ['#5a189a', '#9d4edd', '#c77dff'],
  accent: ['#7b2cbf', '#c77dff', '#e0aaff'],
  background: ['#10002b', '#240046', '#3c096c'],
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 30,
  round: 50,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  large: {
    shadowColor: '#c77dff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  glow: {
    shadowColor: '#c77dff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
};

export const animations = {
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  bodySecondary: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 14,
    color: colors.textMuted,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
};
