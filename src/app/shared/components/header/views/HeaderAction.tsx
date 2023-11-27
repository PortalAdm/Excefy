import { useRouter } from 'next/navigation';
import { ElementType } from 'react';
import { Button } from '~shared/components/Button';

export interface HeaderActionProps {
  onClick?: () => void;
  icon?: ElementType;
  actionLabel: string;
  color: 'primary' | 'white';
  size?: 'small' | 'medium' | 'huge';
  actionBackground?: 'primary' | 'transparent';
  variant?: 'bordered';
  path?: string;
}

export function HeaderAction({
  icon,
  color,
  actionLabel,
  size,
  actionBackground,
  variant,
  path,
  onClick
}: HeaderActionProps) {
  const { push } = useRouter();

  const pushOrOnClick = () => (path ? push?.(path) : onClick?.());

  return (
    <Button.root onClick={pushOrOnClick} color={actionBackground} size={size} variant={variant}>
      <Button.contentWrapper>
        {icon && <Button.icon icon={icon} color={color} />}
        <Button.label text={actionLabel} as="span" color={color} className="text-xs sm:text-md" />
      </Button.contentWrapper>
    </Button.root>
  );
}
