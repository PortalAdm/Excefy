import { tv } from 'tailwind-variants';

export const titleTv = tv({
  base: 'font-Segoe text-black font-bold m-0 duration-500',
  variants: {
    size: {
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      md: 'text-md'
    },
    color: {
      primary: 'text-primary',
      white: 'text-white'
    }
  },
  defaultVariants: {
    size: 'lg'
  }
});
