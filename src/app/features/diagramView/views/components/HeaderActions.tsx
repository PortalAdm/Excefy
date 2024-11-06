import { Button } from '~/src/app/shared/components/Button';
import { IoRocketOutline, IoPlaySkipForwardOutline } from 'react-icons/io5';

interface IActionsProps {
  implantAction: () => void;
  runAction: () => void;
  runDisabled: boolean;
  implantDisabled: boolean;
}

export function HeaderActions({
  implantAction,
  runAction,
  runDisabled,
  implantDisabled
}: IActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button.root disabled={implantDisabled} size="small" onClick={implantAction}>
        <Button.contentWrapper>
          <Button.icon icon={IoRocketOutline} color="white" />
          <Button.label color="white" text={implantDisabled ? '...' : 'Implantar'} />
        </Button.contentWrapper>
      </Button.root>

      <Button.root disabled={runDisabled} size="small" onClick={runAction}>
        <Button.contentWrapper>
          <Button.icon icon={IoPlaySkipForwardOutline} color="white" />
          <Button.label color="white" text={runDisabled ? '...' : 'Run'} />
        </Button.contentWrapper>
      </Button.root>
    </div>
  );
}
