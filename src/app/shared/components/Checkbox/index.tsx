import * as Checkbox from '@radix-ui/react-checkbox';
import { AiOutlineCheck } from 'react-icons/ai';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { checkboxRootTV, checkboxWrapperTV } from '~/src/app/shared/components/Checkbox/CheckboxTV';

interface CheckboxComp {
  label: string;
  id: string;
  checked: boolean;
  onClick: () => void;
}

const CheckboxComp = ({ label, id, checked, onClick }: CheckboxComp) => {
  return (
    <form>
      <div className={checkboxWrapperTV()}>
        <Checkbox.Root checked={checked} onClick={onClick} className={checkboxRootTV()} id={id}>
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
