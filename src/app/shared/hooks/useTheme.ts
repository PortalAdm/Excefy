import { useContext } from 'react';
import { ThemeContext } from '~contexts/ThemeProvider';

export const useTheme = () => useContext(ThemeContext);
