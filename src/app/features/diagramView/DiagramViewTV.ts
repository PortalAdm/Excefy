import { tv } from 'tailwind-variants';

export const BpmnHeaderRootTv = tv({
  base: 'pl-1 sm:px-9 h-20 sm:h-24 flex justify-between items-start py-1 relative'
});

export const BpmnHeaderContentTv = tv({
  base: 'w-full px-2 h-full flex flex-row justify-end overflow-y-hidden sm:overflow-auto flex-wrap gap-2 items-end pb-1'
});
