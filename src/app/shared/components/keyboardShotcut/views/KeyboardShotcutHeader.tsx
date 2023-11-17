import { Title } from '~shared/components/Title';
import { Icon } from '~shared/components/Icon';
import { IoMdClose } from 'react-icons/io';
import { Text } from '~/src/app/shared/components/Text';
import { KeyboardShotcutHeaderTv } from '../KeyboardShotcutTV';

interface KeyboardShotcutHeaderProps {
  changeKeyboardState: () => void;
}

export function KeyboardShotcutHeader({ changeKeyboardState }: KeyboardShotcutHeaderProps) {
  return (
    <div className={KeyboardShotcutHeaderTv()}>
      <div className="flex flex-col gap-2">
        <Title title="Informações" as="h2" color="white" size="md" />
        <Text text="Processos" color="white" size="sm" />
      </div>
      <Icon icon={IoMdClose} onClick={changeKeyboardState} color="white" />
    </div>
  );
}
