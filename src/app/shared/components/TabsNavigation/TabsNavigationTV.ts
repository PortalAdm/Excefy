import { tv } from 'tailwind-variants';

export const tabsNavigationRootTv = tv({
  base: 'w-full flex items-center gap-4'
});

export const tabsNavigationItemsTv = tv({
  base: 'w-fit h-fit border-b-2 p-1',
  variants: {
    state: {
      isActive: 'border-primary',
      notActive: 'border-b-0'
    }
  },
  defaultVariants: {
    state: 'notActive'
  }
});
