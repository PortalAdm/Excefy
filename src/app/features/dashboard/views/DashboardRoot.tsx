import { dashboardRootTv } from '~/src/app/features/dashboard/DashboardTV';
import { TRootComponent } from '~/src/app/shared/types';

export function DashboardRoot({ children }: TRootComponent) {
  return <div className={dashboardRootTv()}>{children}</div>;
}
