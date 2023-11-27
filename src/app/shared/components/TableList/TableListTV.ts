import { tv } from 'tailwind-variants';

export const tableListHeaderTV = tv({
  base: 'h-10 w-fit'
});

export const tableListThTv = tv({
  base: 'text-start w-full w-40 p-2 text-sm leading-5 text-black text-sm text-black font-black'
});

export const tableListContentTrTv = tv({
  base: 'text-placeholder'
});

export const tableListContentNameTv = tv({
  base: 'w-36 p-2 text-sm leading-5 h-16'
});

export const tableListContentDescriptionTv = tv({
  base: 'w-96 p-2 text-sm leading-5 h-16'
});
export const tableDateTv = tv({
  base: 'w-28 p-2 text-sm leading-5 h-16'
});

export const tableListContentStatusTv = tv({
  base: 'w-20 p-2 leading-5 h-16'
});

export const tableListContentBodyTv = tv({
  base: 'divide-y divide-primary h-16 w-[870px]'
});

export const tableListRootTv = tv({
  base: 'pr-12 lg:pr-0 divide-y divide-primary h-[350px] overflow-x-auto overflow-y-hidden flex flex-col items-start w-full'
});

export const tableListButtonsTv = tv({
  base: 'flex gap-3'
});

export const paginationNumberButtonTv = tv({
  base: 'border-transparent text-gray-500 font-black border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
});
