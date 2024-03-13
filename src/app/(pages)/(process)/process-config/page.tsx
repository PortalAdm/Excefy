import { ProcessConfig } from '~/src/app/features/processConfig';

export default function NewProcesspage() {
  return (
    <ProcessConfig.root>
      <ProcessConfig.tabs />
      <ProcessConfig.fields />
    </ProcessConfig.root>
  );
}
