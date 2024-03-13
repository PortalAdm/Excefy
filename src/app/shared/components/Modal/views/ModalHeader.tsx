import { Title } from '~shared/components/Title';
import { Icon } from '~shared/components/Icon';
import { IoMdClose } from 'react-icons/io';
import { ModalHeaderTv } from '../ModalTV';

interface ModalHeaderProps {
  title: string;
  changeModalState: () => void;
}

export function ModalHeader({ title, changeModalState }: ModalHeaderProps) {
  return (
    <div className={ModalHeaderTv()}>
      <Title title={title} as="h2" color="white" size="md" />
      <Icon icon={IoMdClose} onClick={changeModalState} color="white" />
    </div>
  );
}
