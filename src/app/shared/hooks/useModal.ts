import { useState } from 'react';

export const useModal = () => {
  const [modalState, setModalState] = useState(false);

  const changeModalState = () => setModalState((prev) => !prev);

  return {
    modalState,
    changeModalState
  };
};
