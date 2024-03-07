import { TRootComponent } from '~/src/app/shared/types';

export function BpmnRoot({ children }: TRootComponent) {
  return <div className="w-full h-full overflow-hidden justify-center">{children}</div>;
}
