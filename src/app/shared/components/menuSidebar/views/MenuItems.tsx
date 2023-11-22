import React from 'react';
import Link from 'next/link';
import { Icon } from '../../Icon';
import { MenuItemsType } from '~types/index';

interface MenuItemsProps {
  data: MenuItemsType[];
  isClose: boolean;
}

export function MenuItems({ data = [], isClose }: MenuItemsProps) {
  return (
    <>
      {data?.map((item, i) => {
        const renderIcon = () => <Icon color="white" icon={item.icon} />;

        return (
          <React.Fragment key={i}>
            {isClose ? (
              <Link
                className="flex items-center gap-4 hover:font-semi-bold active:font-bold text-white"
                key={i}
                href={item.navigateTo}
              >
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
