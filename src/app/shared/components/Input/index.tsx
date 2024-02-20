import { InputFieldWrapper } from './views/InputFieldWrapper';
import { Icon } from '../Icon';
import { ErrorMessage } from './views/ErrorMessage';
import { InputControlled } from './views/InputControlled';
import { InputControlledTextarea } from './views/InputControlledTextarea';
import { InputField } from './views/InputField';
import { InputLabel } from './views/InputLabel';
import { InputRoot } from './views/InputRoot';
import { InputTextarea } from './views/InputTextarea';

export const Input = {
  root: InputRoot,
  label: InputLabel,
  field: InputField,
  wrapperWithIcon: InputFieldWrapper,
  controlledField: InputControlled,
  icon: Icon,
  error: ErrorMessage,
  textarea: InputTextarea,
  controlledTextarea: InputControlledTextarea
};
