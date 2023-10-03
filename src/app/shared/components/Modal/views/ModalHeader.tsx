import { useModal } from '~hooks/useModal';
import { Title } from '~shared/components/Title';
import { Icon } from '~shared/components/Icon';
import { IoMdClose } from 'react-icons/io';
import { ModalHeaderTv } from '../ModalTV';

interface ModalHeaderProps {
  title: string;
}

export function ModalHeader({ title }: ModalHeaderProps) {
  const { changeModalState } = useModal();

  return (
    <div className={ModalHeaderTv()}>
      <Title title={title} as="h2" color="white" size="md" />
      <Icon icon={IoMdClose} onClick={changeModalState} color="white" />
    </div>
  );
}
