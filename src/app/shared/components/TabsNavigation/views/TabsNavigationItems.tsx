'use client';

import Link from 'next/link';
import { Text } from '../../Text';
import { usePathname } from 'next/navigation';
import { tabsNavigationItemsTv } from '../TabsNavigationTV';
import { TabsNavigationItems as linksProps } from '~types/ITabsNavigationItems';

interface TabsNavigationItemsProps {
  links: linksProps[];
}

export function TabsNavigationItems({ links = [], ...props }: TabsNavigationItemsProps) {
  const pathName = usePathname();

  return (
    <>
      {links.map((link, i) => {
        const isActive = pathName === link.href;

        return (
          <Link
            {...props}
            key={i}
            href={link.href}
            className={tabsNavigationItemsTv({ state: isActive })}
          >
            <Text size="sm" text={link.label} color={isActive ? 'primary' : 'black'} />
          </Link>
        );
      })}
    </>
  );
}
