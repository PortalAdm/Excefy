import { tv } from 'tailwind-variants';

export const iconTv = tv({
  base: 'cursor-pointer',
  variants: {
    size: {
      small: 'w-4 h-4',
      medium: 'w-6 h-6'
    },
    color: {
      primary: 'text-primary',
      white: 'text-white'
    },
    input: {
      right: 'w-6 h-24 text-black absolute right-2 top-1.5'
    },
    button: {
      medium: 'relative w-5 h-5 text-white'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium'
  }
});