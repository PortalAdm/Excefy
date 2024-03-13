import { useState } from 'react';

export const useSwitchController = (checked: boolean) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckChange = () => setIsChecked((isChecked) => !isChecked);

  return { isChecked, handleCheckChange };
};
