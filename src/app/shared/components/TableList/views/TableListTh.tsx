import { tableListThTv } from '../TableListTV';

interface TableListThProps {
  extendName?: boolean;
  titles: string[];
}

export function TableListTh({ extendName = false, titles = [] }: TableListThProps) {
  if (!titles.length) return null;

  return (
    <>
      {titles.map((title, i) => (
        <th
          key={i}
          className={`${tableListThTv()} ${extendName && title === 'Nome' ? 'w-[224px]' : ''}`}
        >
          {title}
        </th>
      ))}
    </>
  );
}
