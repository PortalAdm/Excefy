import { ReactNode } from 'react';

interface BpmnRootProps {
  children: ReactNode;
}

export function BpmnRoot({ children }: BpmnRootProps) {
  return <div className="w-full h-full overflow-hidden justify-center">{children}</div>;
}
