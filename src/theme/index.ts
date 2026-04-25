/**
 * Theme tokens — the HUD/terminal palette used across web + wallet so
 * the visual language stays consistent. Mobile consumers should map these
 * onto the platform-native scaling (dp on Android, points on iOS).
 *
 * If you change a value here, the web frontend's tailwind.config.ts must
 * follow. Memory: feedback_frontend_preserve.md — never alter the HUD
 * palette without checking the web look first.
 */

export const colors = {
  // Background tiers
  bg: '#000000',
  bgElevated: '#0a0a0a',
  bgPanel: '#111111',
  bgInput: '#1a1a1a',

  // Foreground
  fg: '#e8e8e8',
  fgMuted: '#888888',
  fgFaint: '#555555',

  // Accent (HUD green) + status
  accent: '#00ff7f',
  accentDim: '#00aa55',
  warning: '#ffaa00',
  danger: '#ff4444',
  success: '#00ff7f',

  // Borders
  border: '#1f1f1f',
  borderActive: '#00ff7f',
} as const;

export const fonts = {
  mono: 'JetBrains Mono, ui-monospace, Menlo, monospace',
  display: 'Inter, system-ui, sans-serif',
  body: 'Inter, system-ui, sans-serif',
} as const;

export const radii = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8,
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  display: 40,
} as const;

export type ThemeColors = typeof colors;
export type ThemeFonts = typeof fonts;
