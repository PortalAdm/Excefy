'use client';

import Link from 'next/link';
import { Text } from '../../Text';
import { usePathname } from 'next/navigation';
import { VariantProps } from 'tailwind-variants';
import { tabsNavigationItemsTv } from '../TabsNavigationTV';
import { TabsNavigationItems as linksProps } from '~types/ITabsNavigationItems';

interface TabsNavigationItemsProps extends VariantProps<typeof tabsNavigationItemsTv> {
  links: linksProps[];
}

export function TabsNavigationItems({ links = [], state, ...props }: TabsNavigationItemsProps) {
  const pathName = usePathname();

  return (
    <>
      {links.map((link, i) => {
        const isActive = pathName === link.href;

        const activeLinkState: typeof state = isActive ? 'isActive' : 'notActive';

        return (
          <Link
            {...props}
            key={i}
            href={link.href}
            className={tabsNavigationItemsTv({ state: activeLinkState })}
          >
            <Text size="sm" text={link.label} color={isActive ? 'primary' : 'black'} />
          </Link>
        );
      })}
    </>
  );
}
