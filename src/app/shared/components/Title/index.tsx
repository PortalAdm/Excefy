import { ReactNode } from 'react';
import { VariantProps } from 'tailwind-variants';
import { titleTv } from './TitleTV';

interface TitleProps extends VariantProps<typeof titleTv> {
  title: ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function Title({ as, title, size, className, color, ...props }: TitleProps) {
  const Comp = as ?? 'h1';
  return (
    <Comp {...props} className={titleTv({ size, className, color })}>
      {title}
    </Comp>
  );
}
