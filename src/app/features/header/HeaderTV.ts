import { tv } from 'tailwind-variants';

export const HeaderRootTv = tv({
  base: 'w-full h-16 pl-10 pr-10 py-6 flex items-center justify-between border-b-2 border-primary'
});

export const HeaderTitleRootTv = tv({
  base: 'flex flex-col w-full h-fit'
});

export const HeaderContentTv = tv({
  base: 'flex w-full items-center justify-end gap-5'
});

export const HeaderDivisorTv = tv({
  base: 'h-10 w-0.5 bg-primary'
});

export const HeaderTitleTv = tv({
  base: 'transition-all w-full duration-700',
  variants: {
    position: {
      subtitle: 'text-xs',
      label: 'scale-100 translate-y-0 -translate-x-0'
    }
  }
});
