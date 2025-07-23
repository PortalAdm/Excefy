'use client';

import { usePathname } from 'next/navigation';
import { CopilotContainer } from './CopilotContainer';

export function CopilotWrapper() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return <CopilotContainer />;
}
