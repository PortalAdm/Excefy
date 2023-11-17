import { Text } from '~shared/components/Text';
import { Title } from '~shared/components/Title';
import { TKeyboardShotcutInfo } from '~types/TKeyboardShotcutInfo';
import { KeyboardShotcutInfoTv } from '../KeyboardShotcutTV';

interface KeyboardShotcutInfoProps {
  infos: TKeyboardShotcutInfo[];
}

export function KeyboardShotcutInfo({ infos = [] }: KeyboardShotcutInfoProps) {
  return (
    <ul>
      {infos.map((info: TKeyboardShotcutInfo, i: number) => (
        <li key={i} className={KeyboardShotcutInfoTv()}>
          <Title as="h3" title={info.shotcutName} size="md" />
          <Text text={info.shotcut} />
        </li>
      ))}
    </ul>
  );
}
