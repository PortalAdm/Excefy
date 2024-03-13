import React from 'react';
import Link from 'next/link';
import { Icon } from '~/src/app/shared/components/Icon';
import { MenuItemTv } from '~/src/app/features/menuSidebar/MenuSidebarTv';
import { menuItems } from '~/src/app/features/menuSidebar/MenuSidebarUtils';

interface MenuItemsProps {
  isClose: boolean;
}

export function MenuItems({ isClose }: MenuItemsProps) {
  return (
    <>
      {menuItems?.map((item, i) => {
        const renderIcon = () => <Icon color="white" icon={item.icon} />;

        return (
          <React.Fragment key={i}>
            {isClose ? (
              <Link className={MenuItemTv()} key={i} href={item.navigateTo}>
                {renderIcon()}
                {item.name}
              </Link>
            ) : (
              <Link href={item.navigateTo}>{renderIcon()}</Link>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
