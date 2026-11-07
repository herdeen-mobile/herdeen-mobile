/**
 * HerDeen Design Tokens: Colors
 * Generated from Figma Tokens (Light.tokens.json & Dark.tokens.json)
 */

import { useColorScheme } from 'react-native';

export const LightColors = {
  brand: {
    primary: '#C572E3',
    secondary: '#FC89C5',
    primaryDark: '#AD00EB',
  },
  background: {
    bg: '#FFFFFF',
    sectionBg: '#F7F7F7',
    overlay: '#F5F5F5',
    mutedInactive: '#9E9E9E',
  },
  text: {
    primary: '#13181C',
    secondary: '#5B6268',
    inputText: 'rgba(0, 0, 0, 0.3)',
    button: '#FFFFFF',
    reverse: '#FFFFFF',
    fixedWhite: '#FFFFFF',
  },
  stroke: {
    borderStroke: 'rgba(0, 0, 0, 0.1)',
    borderStroke2: 'rgba(255, 255, 255, 0.1)',
    fixedStroke: 'rgba(255, 255, 255, 0.1)',
    brandStroke: 'rgba(196, 62, 220, 0.1)',
  },
  state: {
    success: '#28A745',
    successTint: 'rgba(40, 167, 69, 0.1)',
    warning: '#FFD333',
    warningTint: 'rgba(255, 211, 51, 0.1)',
    error: '#EF4444',
    errorTint: 'rgba(239, 68, 68, 0.1)',
  },
} as const;

export const DarkColors = {
  brand: {
    primary: '#E18DFF',
    secondary: '#FEA1CD',
    primaryDark: '#AA74E0',
  },
  background: {
    bg: '#16171A',
    sectionBg: '#1F2125',
    overlay: '#2B3138',
    mutedInactive: '#7D7D7D',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    inputText: 'rgba(255, 255, 255, 0.3)',
    button: '#FFFFFF',
    reverse: '#000000',
    fixedWhite: '#FFFFFF',
  },
  stroke: {
    borderStroke: 'rgba(255, 255, 255, 0.1)',
    borderStroke2: 'rgba(0, 0, 0, 0.1)',
    fixedStroke: 'rgba(255, 255, 255, 0.1)',
    brandStroke: 'rgba(170, 116, 224, 0.1)', // #AA74E0 with 10% alpha
  },
  state: {
    success: '#0ACF83',
    successTint: 'rgba(10, 207, 131, 0.1)',
    warning: '#FFD333',
    warningTint: 'rgba(255, 211, 51, 0.1)',
    error: '#EF4444',
    errorTint: 'rgba(239, 68, 68, 0.1)',
  },
} as const;

export interface ColorTokens {
  brand: {
    primary: string;
    secondary: string;
    primaryDark: string;
  };
  background: {
    bg: string;
    sectionBg: string;
    overlay: string;
    mutedInactive: string;
  };
  text: {
    primary: string;
    secondary: string;
    inputText: string;
    button: string;
    reverse: string;
    fixedWhite: string;
  };
  stroke: {
    borderStroke: string;
    borderStroke2: string;
    fixedStroke: string;
    brandStroke: string;
  };
  state: {
    success: string;
    successTint: string;
    warning: string;
    warningTint: string;
    error: string;
    errorTint: string;
  };
}

export type ColorTheme = ColorTokens;

export const Colors = {
  light: LightColors,
  dark: DarkColors,
  grey500: '#5B6268',
} as const;

/**
 * Custom hook to get the current active theme colors (light or dark)
 */
export const useThemeColors = (): ColorTheme => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? DarkColors : LightColors;
};
