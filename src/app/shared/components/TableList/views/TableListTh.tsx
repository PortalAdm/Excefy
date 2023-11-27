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
          {title}
        </th>
      ))}
    </>
  );
}
