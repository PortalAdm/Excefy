import Link from 'next/link';
import { ReactNode } from 'react';
import { buttonLinkTv } from '../ButtonTV';

interface ButtonLinkProps {
  children: ReactNode;
  href: string;
}

export function ButtonLink({ children, href }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonLinkTv()}>
      {children}
    </Link>
  );
}
