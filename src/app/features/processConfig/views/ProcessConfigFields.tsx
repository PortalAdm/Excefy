'use client';

import { useNewProcessConfigController } from '~/src/app/features/processConfig/controller';
import { Input } from '~/src/app/shared/components/Input';
import { Text } from '~/src/app/shared/components/Text';

const maxProcessDescriptionLength = 75;
const maxProcessNameLength = 30;

export function ProcessConfigFields() {
  const { processName, processDescription, setProcessName, setProcessDescription } =
    useNewProcessConfigController();

  return (
    <>
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
    </>
  );
}
