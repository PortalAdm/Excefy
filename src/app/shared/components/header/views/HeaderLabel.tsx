import { Text, TextProps } from '../../Text';

interface HeaderLabelProps extends TextProps {}

export function HeaderLabel({ text: label }: HeaderLabelProps) {
  return <Text text={label} size="md" color="primary" />;
}
