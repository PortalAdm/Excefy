import { Button } from '~/src/app/shared/components/Button';
import { KeyboardShotcutFooterTv } from '../KeyboardShotcutTV';

interface KeyboardShotcutFooterProps {
  changeKeyboardState: () => void;
}

export function KeyboardShotcutFooter({ changeKeyboardState }: KeyboardShotcutFooterProps) {
  return (
    <div className={KeyboardShotcutFooterTv()}>
      <Button.root
        color="transparent"
        onClick={changeKeyboardState}
        size="small"
        variant="bordered"
      >
        <Button.contentWrapper>
          <Button.label text="Fechar" color="primary" />
        </Button.contentWrapper>
      </Button.root>
    </div>
  );
}
