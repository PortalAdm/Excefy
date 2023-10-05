import { Title, TitleProps } from '../../Title';

interface HeaderTitleProps extends TitleProps {}

export function HeaderTitle({ title }: HeaderTitleProps) {
  return <Title title={title} color="primary" size="lg" />;
}
