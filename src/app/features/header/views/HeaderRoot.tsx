import { TRootComponent } from '~/src/app/shared/types';
import { HeaderRootTv } from '../HeaderTV';

export function HeaderRoot({ children }: TRootComponent) {
  return <div className={HeaderRootTv()}>{children}</div>;
}
