import { tv } from 'tailwind-variants';

export const inputRootTv = tv({
  base: 'relative w-full max-w-sm h-20 flex flex-col gap-3'
});

export const inputLabelTv = tv({
  base: 'font-Segoe font-normal text-lg leading-6'
});

export const inputFieldTv = tv({
  base: 'ring-1 focus:ring-2 ring-Outline focus:ring-primary outline-Outline bg-transparent focus:outline-primary rounded py-2 px-3 items-center'
});

export const InputIconTv = tv({
  base: 'w-6 h-24 text-black absolute right-2 top-1.5 cursor-pointer'
});

export const errorMessageTv = tv({
  base: 'text-xs text-red-500 mt-1'
});