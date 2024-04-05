import { tv } from 'tailwind-variants';

export const keyboardShotcutContainerTv = tv({
  base: 'absolute transition-all ease-in-out duration-300 right-0 z-40 bg-white',
  variants: {
    state: {
      true: '-translate-x-0',
      false: 'translate-x-80'
    }
  }
});

export const KeyboardShotcutTriggerTv = tv({
  base: 'w-10 h-10 bg-background ring-1 ring-outline absolute z-40 right-0 top-0 flex justify-center items-center z-40'
});

export const KeyboardShotcutHeaderTv = tv({
  base: 'relative top-0 bg-primary w-full flex justify-between z-40 left-0 items-center p-2'
});

export const KeyboardShotcutContentTv = tv({
  base: 'px-6 py-9 overflow-y-scroll overflow-x-hidden max-h-[420px]'
});

export const KeyboardShotcutFooterTv = tv({
  base: 'bg-outline/50 relative p-2 w-full h-14 z-40 bottom-0 left-0 flex justify-end border-t-[1px] border-primary'
});

export const KeyboardShotcutInfoTv = tv({
  base: 'w-full max-w-[235px] h-12 flex flex-col gap-1 mb-4 z-40'
});
