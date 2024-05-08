import { Button } from '~/src/app/shared/components/Button';
import { TProcessState } from '~/src/app/shared/types';

interface IProcessStateActionsProps {
  processState: TProcessState;
  changeProcessState: (state: TProcessState) => void;
}

export function ProcessStateActions({
  processState,
  changeProcessState
}: IProcessStateActionsProps) {
  return (
    <div className="flex space-x-3">
      <Button.root
        size="small"
        disabled={processState === 'design'}
        variant="bordered"
        onClick={() => changeProcessState('design')}
      >
        <Button.contentWrapper>
          <Button.label text="Design" />
        </Button.contentWrapper>
      </Button.root>
      <Button.root
        size="small"
        disabled={processState === 'implementation'}
        variant="bordered"
        onClick={() => changeProcessState('implementation')}
      >
        <Button.contentWrapper>
          <Button.label text="implementação" />
        </Button.contentWrapper>
      </Button.root>
    </div>
  );
}
