import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import DogPicture from './DogPicture';
import { JSX } from 'react';
import IConfig from 'react-chatbot-kit/build/src/interfaces/IConfig';
import { Text } from '~/src/app/shared/components/Text';

const botName = 'Execfy Chatbot';

const config: IConfig = {
  botName,
  initialMessages: [createChatBotMessage('Olá, como posso ajudar?', {})],
  actionProvider: ActionProvider,
  messageParser: MessageParser,
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props: JSX.IntrinsicAttributes) => <DogPicture {...props} />
    }
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#185274'
    },
    chatButton: {
      backgroundColor: '#185274'
    }
  },
  customComponents: {
    header: () => (
      <div className="bg-primary p-2 rounded-tl-md rounded-tr-md">
        <Text text={botName} color="white" />
      </div>
    )
  }
};

export default config;
