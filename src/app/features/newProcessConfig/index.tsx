'use client';

import { Input } from '~shared/components/Input';
import { TabsNavigation } from '~shared/components/TabsNavigation';
import { useNewProcessConfigController } from './controller';
import { Text } from '~/src/app/shared/components/Text';

const maxProcessDescriptionLength = 75;
const maxProcessNameLength = 30;

export function NewProcessConfigForm() {
  const { links, processName, processDescription, setProcessName, setProcessDescription } =
    useNewProcessConfigController();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="pb-16">
        <TabsNavigation.root>
          <TabsNavigation.items links={links} />
        </TabsNavigation.root>
      </div>
      <Input.root>
        <span className="pt-4">
          <Input.label labelSize="small" label="Nome" name="processName" />
          <Text
            size="xs"
            className="text-end h-1"
            text={`${processName?.length || 0}/${maxProcessNameLength}`}
          />
        </span>
        <Input.controlledField
          maxLength={maxProcessDescriptionLength}
          value={processName}
          onChange={(e) => setProcessName(e.target.value)}
          name="processName"
          placeholder="Digite o nome do processo"
        />
      </Input.root>

      <Input.root>
        <span className="pt-4">
          <Input.label labelSize="small" label="Descrição" name="processDescription" />
          <Text
            size="xs"
            className="text-end h-1"
            text={`${processDescription?.length || 0}/${maxProcessDescriptionLength}`}
          />
        </span>
        <Input.controlledTextarea
          value={processDescription}
          maxLength={maxProcessDescriptionLength}
          onChange={(e) => setProcessDescription(e.target.value)}
          name="processDescription"
          placeholder="Digite uma descrição para o processo"
        />
      </Input.root>
    </form>
  );
}
