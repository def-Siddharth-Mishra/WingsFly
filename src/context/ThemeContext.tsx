import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

export interface Theme {
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    shadow: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    accent: string;
    overlay: string;
    progressTrack: string;
    progressFill: string;
    progressThumb: string;
    tagBackground: string;
    statusDone: string;
    statusPending: string;
    fabBackground: string;
    drawerBackground: string;
    iconBackground: string;
  };
  isDark: boolean;
}

const lightTheme: Theme = {
  colors: {
    primary: '#2C3399',
    primaryDark: '#151B73',
    secondary: '#4B63DD',
    background: '#F9F9F9',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#333333',
    textSecondary: '#4D4D4D',
    textMuted: '#999999',
    border: '#E0E0E0',
    shadow: '#000000',
    success: '#4CAF50',
    warning: '#FFA000',
    error: '#F44336',
    info: '#1E8EF7',
    accent: '#DE3B8B',
    overlay: 'rgba(0,0,0,0.2)',
    progressTrack: '#E0E0E0',
    progressFill: '#1E3A8A',
    progressThumb: '#1E3A8A',
    tagBackground: '#F6F6F6',
    statusDone: '#4CAF50',
    statusPending: '#E7E7E7',
    fabBackground: '#151B73',
    drawerBackground: '#FFFFFF',
    iconBackground: '#F3F3F3',
  },
  isDark: false,
};

const darkTheme: Theme = {
  colors: {
    primary: '#4A6BF7',
    primaryDark: '#3A5AF0',
    secondary: '#6B7FFF',
    background: '#121212',
    surface: '#1E1E1E',
    card: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#E0E0E0',
    textMuted: '#AAAAAA',
    border: '#404040',
    shadow: '#000000',
    success: '#66BB6A',
    warning: '#FFB74D',
    error: '#EF5350',
    info: '#42A5F5',
    accent: '#F06292',
    overlay: 'rgba(0,0,0,0.5)',
    progressTrack: '#404040',
    progressFill: '#4A6BF7',
    progressThumb: '#4A6BF7',
    tagBackground: '#404040',
    statusDone: '#66BB6A',
    statusPending: '#505050',
    fabBackground: '#4A6BF7',
    drawerBackground: '#2D2D2D',
    iconBackground: '#404040',
  },
  isDark: true,
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};