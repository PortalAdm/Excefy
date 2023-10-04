import { tv } from 'tailwind-variants';

export const HeaderBodyTv = tv({
  base: 'flex h-20 ml-10 mr-10 items-center border-b-2 border-primary'
});

export const HeaderContentTv = tv({
  base: 'flex w-full items-center justify-end gap-5'
});

export const HeaderTitleTv = tv({
  base: 'font-Segoe text-lg font-bold m-0 text-primary'
});

export const HeaderLabelTv = tv({
  base: 'font-Segoe text-md font-regular m-0 text-primary border-l-2 border-primary pl-4'
});
