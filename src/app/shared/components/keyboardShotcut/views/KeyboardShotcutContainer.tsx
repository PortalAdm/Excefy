import { keyboardShotcutContainerTv } from '../KeyboardShotcutTV';
import { TRootComponent } from '~/src/app/shared/types';

interface KeyboardShotcutContainerProps extends TRootComponent {
  isShotcutOpen: boolean;
}

export function KeyboardShotcutContainer({
  children,
  isShotcutOpen
}: KeyboardShotcutContainerProps) {
  return <div className={keyboardShotcutContainerTv({ state: isShotcutOpen })}>{children}</div>;
}
