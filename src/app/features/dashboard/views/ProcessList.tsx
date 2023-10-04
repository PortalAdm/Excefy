import { TableList } from '~shared/components/TableList';
import { listHeaders, mocckedProcessContent } from '../dashboardUtils';
import { Button } from '~/src/app/shared/components/Button';
import { Header } from '../../header';

export function ProcessList() {
  return (
    <div className="w-full">
      <Header />
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
