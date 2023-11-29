import { tv } from 'tailwind-variants';

export const BpmnHeaderRootTv = tv({
  base: 'sm:px-9 h-20 sm:h-36 flex justify-between items-start py-4'
});

export const BpmnHeaderContentTv = tv({
  base: 'w-full px-2 h-full flex flex-row justify-end overflow-y-hidden sm:overflow-auto flex-wrap gap-2 items-end pb-1'
});
