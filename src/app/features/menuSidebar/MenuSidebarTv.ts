import { tv } from 'tailwind-variants';

export const MenuSidebarRootTv = tv({
  base: 'transition-all duration-300 h-screen flex flex-col gap-4 px-4 py-8 bg-primary',
  variants: {
    state: {
      open: 'w-64',
      close: 'w-14'
    }
  },
  defaultVariants: {
    state: 'close'
  }
});

export const MenuDividerTv = tv({
  base: 'w-full h-0.5 bg-white'
});

export const MenuItemTv = tv({
  base: 'flex items-center gap-4 hover:font-semi-bold active:font-bold text-white'
});

export const SearchMenuTv = tv({
  base: 'w-full h-16 relative border-t-2 border-b-2 border-white flex items-center justify-center'
});
