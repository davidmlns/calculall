import { createContext, useContext, useState } from 'react';

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
    name: 'Default',
    primary: '#cbd5e1',
    background: '#FFFFFF',
    text: '#000000',
    textSec: '#000000',
    icon: '#000000',
    lineColor: '#000000',
  });

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
