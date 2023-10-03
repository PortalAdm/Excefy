import { ReactNode, createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type TTheme = '' | 'dark' | 'light';

interface IthemeContextProps {
  theme?: TTheme;
  changeTheme?: () => void;
}

interface IappThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<IthemeContextProps>({});

export function AppThemeProvider({ children }: IappThemeProviderProps) {
  const { setLocalStorage, getLocalStorage } = useLocalStorage();
  const [theme, setTheme] = useState<TTheme>('dark');

  function changeTheme() {
    const newTheme: TTheme = theme === '' ? 'dark' : '';
    setTheme(newTheme);
    setLocalStorage('theme', newTheme);
  }

  useEffect(() => {
    const themevalue: TTheme = getLocalStorage('theme');
    setTheme(themevalue);
  }, [getLocalStorage]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
