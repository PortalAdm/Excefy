import { TRootComponent } from '~/src/app/shared/types';
import { HeaderContentTv } from '../HeaderTV';

export function HeaderContent({ children }: TRootComponent) {
  return <div className={HeaderContentTv()}>{children}</div>;
}
