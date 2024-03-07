import { TRootComponent } from '~/src/app/shared/types';

export function AuthRoot({ children }: TRootComponent) {
  return <div className="flex">{children}</div>;
}
