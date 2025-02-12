import { tv } from 'tailwind-variants';

export const buttonRootTv = tv({
  base: 'flex justify-center items-center rounded overflow-hidden relative',
  variants: {
    size: {
      small: 'py-1 px-3 w-fit',
      medium: 'py-4 px-16 h-12 w-full max-w-sm sm:w-72 lg:w-96',
      huge: 'py-6 px-16 h-12 w-full'
    },
    color: {
      primary: `relative bg-primary py-2 px-4 hover:after:bg-white/25 after:hover:left-0 after:right-0 after:top-0 after:rounded after:absolute
      after:hover:w-full after:w-0 after:transition-all after:duration-300 after:h-full
      disabled:pointer-events-none disabled:bg-outline active:after:w-full active:after:h-full active:after:top-0 after:left-1/2 active:after:left-0
      active:after:bg-white/5`,
      transparent: 'bg-transparent disabled:pointer-events-none'
    },
    variant: {
      bordered:
        'bg-transparent ring-1 ring-primary hover:bg-primary/25 disabled:pointer-events-none disabled:opacity-30',
      text: `relative disabled:bg-transparent bg-transparent disabled:border-b-[1px] rounded-none
      disabled:border-b-primary disabled:pointer-events-none border-0
      disabled:before:content-[''] disabled:before:absolute disabled:before:bottom-0
      disabled:before:left-0 disabled:before:right-0 disabled:before:bg-primary disabled:before:h-[2px]
      disabled:before:w-full disabled:before:transition-all disabled:before:duration-300
      disabled:before:ease-in-out disabled:before:hover:w-0`,
      onlyIcon: 'bg-transparent ring-0'
    }
  },
  defaultVariants: {
    size: 'medium',
    color: 'primary'
  }
});

export const buttonContentWrapperTv = tv({
  base: 'relative w-fit m-auto flex gap-x-2 items-center'
});

export const buttonLinkTv = tv({
  base: 'w-full h-full z-10'
});

export const buttonIconTv = tv({
  base: 'relative w-5 h-5 text-white'
});
