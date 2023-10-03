import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { AiOutlineCheck } from 'react-icons/ai';
import { Icon } from '../Icon';
import { Text } from '../Text';

interface CheckboxComp {
  label: string;
  id: string;
}

const CheckboxComp = ({ label, id }: CheckboxComp) => (
  <form>
    <div className="flex items-center gap-2">
      <Checkbox.Root
        className="ring-1 ring-placeholder flex h-4 w-4 appearance-none items-center justify-center outline-none"
        id={id}
      >
        <Checkbox.Indicator className="text-violet11">
          <Icon icon={AiOutlineCheck} size="small" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={id}>
        <Text text={label} />
      </label>
    </div>
  </form>
);

export default CheckboxComp;
