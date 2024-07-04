import { useState } from 'react';
import { TMessage } from '~/src/app/shared/types';

export const useChatbotController = () => {
  const [messageList, setMessageList] = useState<TMessage[]>([]);

  const onMessageWasSent = (message: TMessage) => setMessageList([...messageList, message]);

  return {
    messageList,
    onMessageWasSent
  };
};
