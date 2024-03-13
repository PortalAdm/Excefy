import { tv } from 'tailwind-variants';

export const dashboardRootTv = tv({
  base: 'relative h-screen p-10 flex flex-col gap-20 max-w-7xl lg:mx-auto'
});

export const dashboardContentWrapperTv = tv({
  base: 'w-full absolute top-32 lg:relative lg:top-0'
});
