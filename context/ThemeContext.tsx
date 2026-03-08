import { THEME_PREFERENCE_KEY } from '@/constants/storage';
import { Colors, ThemeColors } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  theme: ThemeColors;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  setMode: () => {},
  theme: Colors.light,
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useNativeColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');

  // Load saved preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      const savedMode = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
      if (savedMode) setMode(savedMode as ThemeMode);
    };
    loadTheme();
  }, []);

  // Compute the effective theme
  const isDark =
    mode === 'dark' || (mode === 'system' && systemScheme === 'dark');

  const theme = isDark ? Colors.dark : Colors.light;

  const updateMode = async (newMode: ThemeMode) => {
    setMode(newMode);
    await AsyncStorage.setItem(THEME_PREFERENCE_KEY, newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode: updateMode, theme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};