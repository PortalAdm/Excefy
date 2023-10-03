import { ModalAction } from './views/ModalAction';
import { ModalBody } from './views/ModalBody';
import { ModalContent } from './views/ModalContent';
import { ModalFooter } from './views/ModalFooter';
import { ModalHeader } from './views/ModalHeader';
import { ModalRoot } from './views/ModalRoot';
import { ModalTrigger } from './views/ModalTrigger';

export const Modal = {
  root: ModalRoot,
  trigger: ModalTrigger,
  content: ModalContent,
  header: ModalHeader,
  body: ModalBody,
  footer: ModalFooter,
  action: ModalAction
};
