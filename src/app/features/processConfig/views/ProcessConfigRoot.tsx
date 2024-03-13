'use client';

import { TRootComponent } from '~/src/app/shared/types';

export function ProcessConfigRoot({ children }: TRootComponent) {
  return <form onSubmit={(e) => e.preventDefault()}>{children}</form>;
}
