import { tv } from 'tailwind-variants';

export const ToastRootTv = tv({
  base: 'bg-white flex transition-all duration-300 ease-in flex-col gap-2 w-96 rounded-lg h-fit ring-1 p-2 sm:p-4 absolute top-4 right-6 z-[100]',
  variants: {
    visible: {
      visible: '-translate-x-0',
      hidden: 'translate-x-[500px]'
    },
    state: {
      success: 'ring-success',
      error: 'ring-error'
    }
  }
});

export const ToastHeaderTv = tv({
  base: 'w-full flex items-center justify-between'
});
