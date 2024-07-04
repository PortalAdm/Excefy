'use client';

import 'react-chatbot-kit/build/main.css';

// import Chatbot from 'react-chatbot-kit';
// import config from './views/config';
// import IConfig from 'react-chatbot-kit/build/src/interfaces/IConfig';
import { usePathname } from 'next/navigation';
import { APP_ROUTES } from '../../shared/utils/constants/app-routes';

export function ChatBotComp() {
  const pathname = usePathname();

  if (pathname === APP_ROUTES.public.home) return null;

  return (
    <div className="absolute bottom-0">
      {/* <Chatbot
        config={config as unknown as IConfig}
        messageParser={config.messageParser}
        actionProvider={config.actionProvider}
      /> */}
    </div>
  );
}
