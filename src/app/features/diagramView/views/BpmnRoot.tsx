import { TRootComponent } from '~/src/app/shared/types';

export function BpmnRoot({ children }: TRootComponent) {
  return <div className="w-full h-[calc(100%_-_6rem)] justify-center">{children}</div>;
}
