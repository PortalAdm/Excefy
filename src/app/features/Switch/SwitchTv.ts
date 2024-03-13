import { tv } from 'tailwind-variants';

export const switchRootTv = tv({
  base: `bg-primary border-2 border-primary data-[state=checked]:border-0 data-[state=checked]:bg-placeholder/50
    transition-all duration-100 rounded-full relative outline-none cursor-pointer`,
  variants: {
    size: {
      small: 'w-6 h-4',
      medium: 'w-10 h-6'
    }
  },
  defaultVariants: {
    size: 'small'
  }
});

export const switchThumbTv = tv({
  base: `block bg-white data-[state=checked]:bg-outline rounded-full shadow-[0_2px_2px] shadow-blackA7
    transition-transform duration-100 translate-x-0.4 will-change-transform`,
  variants: {
    size: {
      small: 'w-3 h-3 data-[state=checked]:translate-x-[10px]',
      medium: 'w-5 h-5 data-[state=checked]:translate-x-[19px]'
    }
  },
  defaultVariants: {
    size: 'small'
  }
});
