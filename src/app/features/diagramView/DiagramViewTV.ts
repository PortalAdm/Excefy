import { tv } from 'tailwind-variants';

export const BpmnHeaderRootTv = tv({
  base: 'pl-1 sm:px-9 h-20 sm:h-24 flex justify-between items-start py-1 relative'
});

export const BpmnHeaderContentTv = tv({
  base: 'w-full px-2 h-full flex flex-row justify-end overflow-y-hidden sm:overflow-auto flex-wrap gap-2 items-end pb-1'
});

export const BpmnContentFallbackTv = tv({
  base: 'flex flex-col items-center justify-center gap-4'
});

export const EventDetailRootTv = tv({
  base: 'absolute duration-500 bg-white ring-1 ring-primary w-96 h-[calc(100%+5.8rem)] right-0 z-50 -top-[6rem]',
  variants: {
    isDetailsOpen: {
      true: '-translate-x-0',
      false: 'translate-x-[100%]'
    }
  }
});

export const ToggleDetailsTv = tv({
  base: 'w-36 h-9 duration-500 bg-primary absolute top-72 flex gap-4 items-center justify-center -rotate-90 absolute -left-24'
});

export const EventDetailContentTv = tv({
  base: 'relative h-10 w-96 bg-primary left-0 flex p-2 items-center mb-2'
});

export const EventDetailContentWrapperTv = tv({
  base: 'w-full h-[calc(100%-4rem)] px-2 overflow-y-scroll z-50'
});

export const bpmnViewerHeaderTv = tv({
  base: 'flex flex-col gap-2 absolute bottom-0 w-full max-w-[280px]'
});

export const bpmnCanvasTv = tv({
  base: 'relative h-[calc(100%_-_4rem)] border-t-[1px] border-primary z-0'
});
