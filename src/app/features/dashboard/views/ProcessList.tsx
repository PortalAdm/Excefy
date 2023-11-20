'use client';

import { TableList } from '~shared/components/TableList';
import { listHeaders, mocckedProcessContent } from '../dashboardUtils';
import { Button } from '~/src/app/shared/components/Button';
import { useDashboardController } from '../controller';

export function ProcessList() {
  const { data } = useDashboardController();

  // eslint-disable-next-line no-console
  console.log(data?.[0] && JSON.parse(data?.[0].content as unknown as string));

  return (
    <div className="w-full">
      <div className="p-10">
        <Button.root size="small" className="mb-20">
          <Button.link href={'/new-process'}>
            <Button.contentWrapper>
              <Button.label text="Criar processo" color="white" size="lg" weigth="bold" />
            </Button.contentWrapper>
          </Button.link>
        </Button.root>

        <TableList.root>
          <TableList.header>
            <TableList.name titles={listHeaders} />
          </TableList.header>
          <TableList.body>
            <TableList.content content={mocckedProcessContent} />
          </TableList.body>
        </TableList.root>
      </div>
    </div>
  );
}
