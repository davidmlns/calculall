import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = {
  name: string;
  primary: string;
  background: string;
  text: string;
  textSec: string;
  icon: string;
  lineColor: string;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: {
    name: 'Default',
    primary: '#cbd5e1',
    background: '#FFFFFF',
    text: '#000000',
    textSec: '#000000',
    icon: '#000000',
    lineColor: '#000000',
  },
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>({
    name: 'Light Mode', // Cambia el nombre para coincidir con tu tema por defecto
    primary: '#cbd5e1',
    background: '#FFFFFF',
    text: '#000000',
    textSec: '#505050',
    icon: '#000000',
    lineColor: '#000000',
  });

  // Cargar tema al montar el componente
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@theme');
        if (savedTheme) {
          setTheme(JSON.parse(savedTheme));
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  // Guardar tema cuando cambie
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('@theme', JSON.stringify(theme));
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    };
    saveTheme();
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
