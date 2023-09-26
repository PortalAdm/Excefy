import { HamburguerAnimation, HamburguerAnimationProps } from '~animations/hamburguer';

interface HamburguerProps extends HamburguerAnimationProps {}

export function Hamburguer({ isClose, onClick }: HamburguerProps) {
  return <HamburguerAnimation isClose={isClose} onClick={onClick} />;
}
