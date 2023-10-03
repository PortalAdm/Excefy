import { ElementType } from 'react';
import { Button } from '~shared/components/Button';

interface ModalActionProps {
  onClick: () => void;
  icon?: ElementType;
  actionLabel: string;
  color: 'primary' | 'white';
  size?: 'small' | 'medium' | 'huge';
  actionBackground?: 'primary' | 'transparent';
  variant?: 'bordered';
}

export function ModalAction({
  icon,
  color,
  actionLabel,
  size,
  actionBackground,
  variant,
  onClick
}: ModalActionProps) {
  return (
    <Button.root onClick={onClick} color={actionBackground} size={size} variant={variant}>
      <Button.contentWrapper>
        {icon && <Button.icon icon={icon} color={color} />}
        <Button.label text={actionLabel} as="span" color={color} />
      </Button.contentWrapper>
    </Button.root>
  );
}
