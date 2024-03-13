/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Icon } from '../Icon';
import Link from 'next/link';
import { useAuthController } from '~/src/app/features/auth/controller';
import * as tv from '~/src/app/shared/components/Dropdown/DropsownTV';

interface DropdownRootProps {
  options: MenuOptions[];
}

export type MenuOptions = {
  href: string;
  label: string;
};

export function Dropdown({ options }: DropdownRootProps) {
  const { logout } = useAuthController();

  return (
    <Menu as="div" className={tv.dropdownMenuRootTV()}>
      <div>
        <Menu.Button className={tv.dropdownMenuButtonTV()}>
          <Icon
            icon={IoMdArrowDropdown}
            color="primary"
            aria-hidden="true"
            size="small"
            dropdown="base"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={tv.dropdownMenuItemsTV()}>
          {options.map((option, i) => (
            <Menu.Item key={`menu-item-${i}`}>
              {({ active }) => (
                <Link href={option.href} className={tv.dropdownMenuLinkTV({ state: active })}>
                  {option.label}
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            {({ active }) => (
              <button className={tv.dropdownMenuItemTV({ state: active })} onClick={logout}>
                Sair
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
