'use client';

import { ReactNode, useEffect, useState } from 'react';
import { MenuSidebarRootTv } from '../MenuSidebarTv';

interface MenuSidebarRootProps {
  children: ReactNode;
  isClose: boolean;
}

export function MenuSidebarRoot({ children, isClose }: MenuSidebarRootProps) {
  const [closed, setIsClosed] = useState<'close' | 'open'>('close');

  useEffect(() => {
    isClose ? setIsClosed('open') : setIsClosed('close');
  }, [isClose]);

  return <aside className={MenuSidebarRootTv({ state: closed })}>{children}</aside>;
}
