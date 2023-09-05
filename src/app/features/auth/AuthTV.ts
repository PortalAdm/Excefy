import { tv } from 'tailwind-variants';

export const authTV = tv({
  base: 'flex'
});

export const authHeroTv = tv({
  base: 'relative hidden md:flex w-full'
});

export const authFormTv = tv({
  base: 'relative flex flex-col justify-center items-center p-2 gap-12 w-full md:w-2/5 lg:w-3/5 h-screen bg-background'
});

export const recoveryButtonTv = tv({
  base: 'absolute top-2 lg:top-12 right-2 lg:right-12'
});
