import { ElementType, forwardRef } from 'react';
import { useHeaderController } from '~/src/app/features/header/controller';
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

export const HeaderAction = forwardRef<HTMLButtonElement, HeaderActionProps>(
  ({ icon, color, actionLabel, size, actionBackground, variant, path, onClick, ...props }, ref) => {
    const { pushOrOnClick } = useHeaderController();

    return (
      <Button.root
        ref={ref}
        onClick={() => pushOrOnClick(path, onClick)}
        color={actionBackground}
        size={size}
        variant={variant}
        {...props}
      >
        <Button.contentWrapper>
          {icon && <Button.icon icon={icon} color={color} />}
          <Button.label text={actionLabel} as="span" color={color} className="text-xs sm:text-md" />
        </Button.contentWrapper>
      </Button.root>
    );
  }
);

HeaderAction.displayName = 'HeaderAction';
