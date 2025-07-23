import { ComponentProps, ElementType } from 'react';
import { Button } from '~shared/components/Button';

interface ModalActionProps {
  onClick?: () => void;
  icon?: ElementType;
  actionLabel: string;
  color: 'primary' | 'white';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'huge';
  actionBackground?: 'primary' | 'transparent';
  variant?: 'bordered';
  type?: ComponentProps<'button'>['type'];
}

export function ModalAction({
  icon,
  color,
  actionLabel,
  size,
  actionBackground,
  variant,
  disabled,
  type,
  onClick
}: ModalActionProps) {
  return (
    <Button.root
      type={type}
      disabled={disabled}
      onClick={onClick}
      color={actionBackground}
      size={size}
      variant={variant}
    >
      <Button.contentWrapper>
        {icon && <Button.icon icon={icon} color={color} />}
        <Button.label text={actionLabel} as="span" color={color} />
      </Button.contentWrapper>
    </Button.root>
  );
}
