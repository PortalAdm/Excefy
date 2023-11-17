import { Text } from '~shared/components/Text';
import { Icon } from '~shared/components/Icon';
import { IoMdClose } from 'react-icons/io';
import { VariantProps } from 'tailwind-variants';
import { textTv } from '~shared/components/Text/TextTV';
import { ToastHeaderTv } from '../ToastTV';
import { useToast } from '~hooks/useToast';

interface ToastHeaderProps extends VariantProps<typeof textTv> {
  title?: string;
  onClick: () => void;
}

export function ToastHeader({ title, color, onClick }: ToastHeaderProps) {
  const { toastOptions } = useToast();

  const toastStateColor: typeof color = toastOptions.state === 'success' ? 'success' : 'error';

  return (
    <div className={ToastHeaderTv()}>
      <Text
        text={toastOptions.messageTitle ?? title}
        weigth="bold"
        size="sm"
        color={toastStateColor}
      />
      <Icon icon={IoMdClose} onClick={onClick} />
    </div>
  );
}
