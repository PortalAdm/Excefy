import { TRootComponent } from '~/src/app/shared/types';
import { tabsNavigationRootTv } from '../TabsNavigationTV';

export function TabsNavigationRoot({ children }: TRootComponent) {
  return <div className={tabsNavigationRootTv()}>{children}</div>;
}
