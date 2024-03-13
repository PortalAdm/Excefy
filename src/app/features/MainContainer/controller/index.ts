import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IthemeContextProps } from '~/src/app/shared/contexts/ThemeProvider';
import { useTheme } from '~hooks/useTheme';

export const useMainContainerController = () => {
  const { theme } = useTheme();
  const [isFlex, setIsFlex] = useState(false);
  const [isClientSide, setIsClientSide] = useState(false);

  const isDarkMode: IthemeContextProps['theme'] = theme === 'dark' ? 'dark' : 'light';

  const pathName = usePathname();

  useEffect(() => {
    if (pathName === '/') return setIsFlex(false);
    setIsFlex(true);
  }, [pathName]);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  const flexDirection: 'row' | 'col' = isFlex ? 'row' : 'col';

  return {
    isClientSide,
    isDarkMode,
    flexDirection
  };
};
