'use client';

import { Input } from '~shared/components/Input';
import { TabsNavigation } from '~shared/components/TabsNavigation';
import { useNewProcessConfigController } from '../controller';
import { Toast } from '../../toast';

export function NewProcessConfigForm() {
  const { links, processName, processDescription, setProcessName, setProcessDescription } =
    useNewProcessConfigController();

  return (
    <>
      <Toast />
      <form>
        <div className="pb-16">
          <TabsNavigation.root>
            <TabsNavigation.items links={links} />
          </TabsNavigation.root>
        </div>
        <Input.root>
          <Input.label labelSize="small" label="Nome" name="processName" />
          <Input.controlledField
            value={processName}
            onChange={(e) => setProcessName(e.target.value)}
            name="processName"
            placeholder="Digite o nome do processo"
          />
        </Input.root>

        <Input.root>
          <Input.label labelSize="small" label="Descrição" name="processDescription" />
          <Input.controlledTextarea
            value={processDescription}
            onChange={(e) => setProcessDescription(e.target.value)}
            name="processDescription"
            placeholder="Digite uma descrição para o processo"
          />
        </Input.root>
      </form>
    </>
  );
}
