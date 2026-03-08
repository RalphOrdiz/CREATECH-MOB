/**
 * Modern "Zinc" Palette for a clean, aesthetic look.
 */
import { Platform } from 'react-native';

const tintColorLight = '#2563EB'; // Bright Blue (Primary)
const tintColorDark = '#3B82F6';  // Lighter Blue for Dark Mode

export const Colors = {
  light: {
    text: '#0f172a',        // Slate 900
    textSecondary: '#64748b', // Slate 500
    background: '#ffffff',
    card: '#f8fafc',        // Slate 50 (Slightly off-white for cards)
    cardBorder: '#e2e8f0',  // Slate 200
    tint: tintColorLight,
    icon: '#64748b',
    tabIconDefault: '#94a3b8',
    tabIconSelected: tintColorLight,
    inputBackground: '#ffffff',
    inputBorder: '#cbd5e1',
    danger: '#ef4444',
  },
  dark: {
    text: '#f8fafc',        // Slate 50
    textSecondary: '#94a3b8', // Slate 400
    background: '#020617',  // Slate 950 (Rich dark, not pitch black)
    card: '#0f172a',        // Slate 900
    cardBorder: '#1e293b',  // Slate 800
    tint: tintColorDark,
    icon: '#94a3b8',
    tabIconDefault: '#475569',
    tabIconSelected: tintColorDark,
    inputBackground: '#020617',
    inputBorder: '#334155',
    danger: '#ef4444',
  },
};

// Helper type to make using the theme easier in components
export type ThemeColors = typeof Colors.light;

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Times New Roman',
    rounded: 'System',
    mono: 'Courier New',
  },
  default: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif-medium',
    mono: 'monospace',
  },
});