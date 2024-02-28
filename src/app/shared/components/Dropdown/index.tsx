/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Icon } from '../Icon';
import Link from 'next/link';
import { useAuthController } from '~/src/app/features/auth/controller';

interface DropdownRootProps {
  options: MenuOptions[];
}

export type MenuOptions = {
  href: string;
  label: string;
};

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function Dropdown({ options }: DropdownRootProps) {
  const { logout } = useAuthController();

  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      <div>
        <Menu.Button className="w-fit h-fit bg-transparent transition-transform duration-300 hover:translate-y-1 translate-y-0.5 cursor-pointer">
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-primary ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option, i) => (
            <Menu.Item key={`menu-item-${i}`}>
              {({ active }) => (
                <Link
                  href={option.href}
                  className={classNames(
                    active ? 'bg-gray-100 text-white' : 'text-white/70',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  {option.label}
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? 'bg-gray-100 text-white' : 'text-white/70',
                  'block px-4 py-2 text-sm w-full text-start'
                )}
                onClick={logout}
              >
                Sair
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
