import { TRootComponent } from '~/src/app/shared/types';
import { KeyboardShotcutContentTv } from '../KeyboardShotcutTV';

export function KeyboardShotcutContent({ children }: TRootComponent) {
  return <div className={KeyboardShotcutContentTv()}>{children}</div>;
}
