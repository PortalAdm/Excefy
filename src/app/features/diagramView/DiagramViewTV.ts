import { tv } from 'tailwind-variants';

export const BpmnHeaderRootTv = tv({
  base: 'sm:px-6 h-20 sm:h-24 flex justify-end'
});

export const BpmnHeaderContentTv = tv({
  base: 'w-fit px-2 flex flex-row justify-end overflow-y-hidden sm:overflow-auto flex-wrap gap-2 items-center'
});
