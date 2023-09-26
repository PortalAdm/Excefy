import { ReactNode } from 'react';

interface SearchRootProps {
  children: ReactNode;
}

export function SearchRoot({ children }: SearchRootProps) {
  return <div className="w-full h-8">{children}</div>;
}
