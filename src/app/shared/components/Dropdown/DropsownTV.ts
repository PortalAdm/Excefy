import { tv } from 'tailwind-variants';

export const dropdownMenuRootTV = tv({
  base: 'relative inline-block text-left z-50'
});

export const dropdownMenuButtonTV = tv({
  base: 'w-fit h-fit bg-transparent transition-transform duration-300 hover:translate-y-1 translate-y-0.5 cursor-pointer'
});

export const dropdownMenuItemsTV = tv({
  base: 'origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-primary ring-1 ring-black ring-opacity-5 focus:outline-none'
});

export const dropdownMenuLinkTV = tv({
  base: 'block px-4 py-2 text-sm',
  variants: {
    state: {
      true: 'bg-gray-100 text-white',
      false: 'text-white/70'
    }
  }
});

export const dropdownMenuItemTV = tv({
  base: 'block px-4 py-2 text-sm w-full text-start',
  variants: {
    state: {
      true: 'bg-gray-100 text-white',
      false: 'text-white/70'
    }
  }
});
