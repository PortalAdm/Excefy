import { tv } from 'tailwind-variants';

export const textTv = tv({
  base: 'font-Segoe text-black',
  variants: {
    size: {
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-md',
      sm: 'text-sm',
      xs: 'text-xs',
      xxs: 'text-xxs'
    },
    weigth: {
      bold: 'font-bold',
      normal: 'font-normal',
      light: 'font-light',
      'semi-bold': 'font-semi-bold',
      black: 'font-black'
    },
    color: {
      primary: 'text-primary',
      placeholder: 'text-placeholder',
      white: 'text-white',
      success: 'text-success',
      error: 'text-error'
    }
  },
  defaultVariants: {
    size: 'md',
    weigth: 'normal'
  }
});
