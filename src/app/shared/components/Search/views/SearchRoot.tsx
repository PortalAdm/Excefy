import { HTMLAttributes, ReactNode } from 'react';

interface SearchRootProps extends HTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export function SearchRoot({ children }: SearchRootProps) {
  return <form className="w-full h-8 flex relative">{children}</form>;
}
