import { tv } from 'tailwind-variants';

export const mainContainerTv = tv({
  base: 'flex transition-colors w-full h-screen bg-background',
  variants: {
    'flex-direction': {
      row: 'flex-row',
      col: 'flex-col'
    },
    theme: {
      dark: 'dark',
      light: 'light'
    }
  }
});
