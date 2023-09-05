import { ReactNode } from 'react';
import { VariantProps } from 'tailwind-variants';
import { textTv } from './TextTV';

export interface TextProps extends VariantProps<typeof textTv> {
  text: ReactNode;
  className?: string;
  as?: 'span';
}

export function Text({
  as,
  text = '',
  size = 'sm',
  weigth,
  color,
  className = '',
  ...props
}: TextProps) {
  const Comp = as ?? 'p';

  return (
    <Comp {...props} className={textTv({ size, weigth, color, className })}>
      {text}
    </Comp>
  );
}
