import { tv } from 'tailwind-variants';

export const ModalTv = tv({
  base: 'transform-all duration-300 inset-0 z-50 overflow-hidden bg-black/30 fixed flex justify-center items-center p-2 sm:p-4',
  variants: {
    modalState: {
      true: 'scale-100',
      false: 'scale-0'
    }
  }
});

export const ModalContentTv = tv({
  base: 'bg-white rounded-lg relative w-full max-w-xl overflow-hidden'
});

export const ModalHeaderTv = tv({
  base: 'relative top-0 bg-primary w-full flex justify-between left-0 items-center p-2 sm:p-6 rounded-t-lg'
});

export const ModalBodyTv = tv({
  base: 'p-2 sm:p-6 flex flex-col gap-4'
});

export const ModalFooterTv = tv({
  base: 'bg-outline/50 relative p-2 sm:p-6 w-full h-16 rounded-b-lg bottom-0 left-0 flex justify-end'
});

export const ModalFooterContentTv = tv({
  base: 'flex items-center gap-2 p-1'
});
