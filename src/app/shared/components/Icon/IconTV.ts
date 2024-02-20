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
      white: 'text-white',
      outline: 'text-outline'
    },
    input: {
      right: 'w-6 absolute right-2 text-black',
      left: 'absolute left-2 top-1.5'
    },
    button: {
      medium: 'relative w-5 h-5 text-white'
    },
    dropdown: {
      base: '-ml-4 h-5 w-5'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium'
  }
});
