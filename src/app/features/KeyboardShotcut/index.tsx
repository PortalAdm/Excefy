'use client';

import { useState } from 'react';
import { infos } from './KeyboardShotcutUtils';
import { KeyboardShotcut as KeyboardShotcutComp } from '~shared/components/keyboardShotcut';

export function KeyboardShotcut() {
  const [isKeyboardShotcutOpen, setIsKeyboardShotcut] = useState(false);

  const changeKeyboardState = () =>
    setIsKeyboardShotcut((isKeyboardShotcutOpen) => !isKeyboardShotcutOpen);

  return (
    <KeyboardShotcutComp.root>
      <KeyboardShotcutComp.trigger onClick={changeKeyboardState} />
      <KeyboardShotcutComp.container isShotcutOpen={isKeyboardShotcutOpen}>
        <KeyboardShotcutComp.header changeKeyboardState={changeKeyboardState} />
        <KeyboardShotcutComp.content>
          <KeyboardShotcutComp.info infos={infos} />
        </KeyboardShotcutComp.content>
        <KeyboardShotcutComp.footer changeKeyboardState={changeKeyboardState} />
      </KeyboardShotcutComp.container>
    </KeyboardShotcutComp.root>
  );
}
