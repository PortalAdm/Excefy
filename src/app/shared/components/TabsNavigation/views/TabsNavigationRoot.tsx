import { ReactNode } from 'react';
import { tabsNavigationRootTv } from '../TabsNavigationTV';

interface TabsNavigationRootProps {
  children: ReactNode;
}

export function TabsNavigationRoot({ children }: TabsNavigationRootProps) {
  return <div className={tabsNavigationRootTv()}>{children}</div>;
}
