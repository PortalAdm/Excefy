import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';

interface IMessage {
  messages: any;
}

interface IActionProvider {
  children: React.ReactElement;
  createChatBotMessage: typeof createChatBotMessage;
  setState: React.Dispatch<React.SetStateAction<IMessage>>;
}

const ActionProvider = ({ createChatBotMessage, setState, children }: IActionProvider) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.', {});

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  };

  const handleDog = () => {
    const botMessage = createChatBotMessage("Here's a nice dog picture for you!", {
      widget: 'dogPicture'
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  };

  const handleChoiseProcessToEdit = () => {
    const botMessage = createChatBotMessage('Qual Processo você gostaria de editar?', {});

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage]
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleDog,
            handleChoiseProcessToEdit
          }
        });
      })}
    </div>
  );
};

export default ActionProvider;
