import { tv } from 'tailwind-variants';

export const BpmnHeaderRootTv = tv({
  base: 'pl-1 sm:px-9 h-20 sm:h-24 flex justify-between items-start py-1 relative'
});

export const BpmnHeaderContentTv = tv({
  base: 'w-full px-2 h-full flex flex-row justify-end overflow-y-hidden sm:overflow-auto flex-wrap gap-2 items-end pb-1'
});

export const EventDetailRootTv = tv({
  base: 'absolute bg-white ring-1 ring-primary w-68 max-h-[650px] overflow-y-scroll right-0 z-20'
});

export const EventDetailContentTv = tv({
  base: 'relative h-10 w-full bg-primary left-0 flex p-2 items-center mb-2'
});

export const bpmnViewerHeaderTv = tv({
  base: 'flex flex-col gap-2 absolute bottom-0 w-full max-w-[280px]'
});

export const bpmnCanvasTv = tv({
  base: 'relative h-full border-t-[1px] border-primary z-0'
});
