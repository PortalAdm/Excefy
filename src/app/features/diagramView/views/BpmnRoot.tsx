import { TRootComponent } from '~/src/app/shared/types';

export function BpmnRoot({ children }: TRootComponent) {
  return <div className="w-full h-screen justify-center">{children}</div>;
}
