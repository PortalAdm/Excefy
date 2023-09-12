import { Text } from '~shared/components/Text';
import { tableListThTv } from '../TableListTV';

interface TableListThProps {
  titles: string[];
}

export function TableListTh({ titles = [] }: TableListThProps) {
  if (!titles.length) return null;

  return (
    <>
      {titles.map((title, i) => (
        <th key={i} className={tableListThTv()}>
          <Text text={title} weigth="black" size="sm" color="placeholder" />
        </th>
      ))}
    </>
  );
}
