import { Text, TextProps } from '../../Text';
import { HeaderLabelTv } from '../HeaderTV';

interface HeaderLabelProps extends TextProps {}

export function HeaderLabel({ text }: HeaderLabelProps) {
  return (
    <div className={HeaderLabelTv()}>
      <Text text={text} size="md" color="primary" />
    </div>
  );
}
