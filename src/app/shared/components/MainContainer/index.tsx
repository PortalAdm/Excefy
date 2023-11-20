'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from '~hooks/useTheme';
interface MainContainerProps {
  children: React.ReactNode;
}

export function MainContainer({ children }: MainContainerProps) {
  const { theme } = useTheme();
  const [isFlex, setIsFlex] = useState(false);
  const [isClientSide, setIsClientSide] = useState(false);

  const isDarkMode = theme === 'dark' ? 'dark' : 'light';

  const pathName = usePathname();

  useEffect(() => {
    if (pathName === '/') return setIsFlex(false);
    setIsFlex(true);
  }, [pathName]);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  const flex = isFlex ? 'flex' : '';

  return (
    <main className={`${isDarkMode} ${flex} transition-colors w-full h-screen bg-background`}>
      {isClientSide && children}
    </main>
  );
}
