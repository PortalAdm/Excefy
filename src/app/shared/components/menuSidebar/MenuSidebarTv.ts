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
