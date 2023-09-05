'use client';

import { useTheme } from '~hooks/useTheme';
interface MainContainerProps {
  children: React.ReactNode;
}

export function MainContainer({ children }: MainContainerProps) {
  const { theme } = useTheme();

  const isDarkMode = theme === 'dark' ? 'dark' : 'light';

  return (
    <main className={`${isDarkMode} transition-colors w-screen h-screen bg-background`}>
      {children}
    </main>
  );
}
