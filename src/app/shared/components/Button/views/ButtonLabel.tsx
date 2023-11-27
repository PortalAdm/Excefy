import { Text, TextProps } from '~shared/components/Text';

interface ButtonLabelProps extends TextProps {}

export function ButtonLabel({ text, color, size, weigth, className }: ButtonLabelProps) {
  return <Text text={text} size={size} color={color} weigth={weigth} className={className} />;
}
