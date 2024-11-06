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
        variant="text"
        onClick={() => changeProcessState('design')}
      >
        <Button.contentWrapper>
          <Button.label text="Design" color={processState === 'design' ? 'primary' : 'black'} />
        </Button.contentWrapper>
      </Button.root>
      <Button.root
        size="small"
        disabled={processState === 'implementation'}
        variant="text"
        onClick={() => changeProcessState('implementation')}
      >
        <Button.contentWrapper>
          <Button.label
            text="implementação"
            color={processState === 'implementation' ? 'primary' : 'black'}
          />
        </Button.contentWrapper>
      </Button.root>
    </div>
  );
}
