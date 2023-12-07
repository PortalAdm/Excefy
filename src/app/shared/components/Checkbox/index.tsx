import * as Checkbox from '@radix-ui/react-checkbox';
import { AiOutlineCheck } from 'react-icons/ai';
import { Icon } from '../Icon';
import { Text } from '../Text';

interface CheckboxComp {
  label: string;
  id: string;
  checked: boolean;
  onClick: () => void;
}

const CheckboxComp = ({ label, id, checked, onClick }: CheckboxComp) => {
  return (
    <form>
      <div className="flex items-center gap-2">
        <Checkbox.Root
          checked={checked}
          onClick={onClick}
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
};

export default CheckboxComp;
