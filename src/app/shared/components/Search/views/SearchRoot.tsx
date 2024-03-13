import { HTMLAttributes } from 'react';
import { searchRootTv } from '~/src/app/shared/components/Search/SearchTV';
import { TRootComponent } from '~/src/app/shared/types';

type TSearchRootProps = HTMLAttributes<HTMLFormElement> & TRootComponent;

export function SearchRoot({ children }: TSearchRootProps) {
  return <form className={searchRootTv()}>{children}</form>;
}
