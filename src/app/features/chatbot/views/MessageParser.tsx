import { useRouter } from 'next/navigation';
import React from 'react';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

interface IActionProviderActions {
  handleHello: () => void;
  handleDog: () => void;
  handleChoiseProcessToEdit: () => void;
}

export interface IMessageParser {
  children: React.ReactElement;
  actions: IActionProviderActions;
}

const MessageParser = ({ children, actions }: IMessageParser) => {
  const { push } = useRouter();

  const parse = (message: string) => {
    if (message.includes('hello')) {
      actions.handleHello();
    }

    if (message.includes('dog')) {
      actions.handleDog();
    }

    if (message.includes('editar processo')) {
      actions.handleChoiseProcessToEdit();
    }

    if (message.includes('processo 132')) {
      return push(`${APP_ROUTES.private['edit-process'].name}/132`);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions
        });
      })}
    </div>
  );
};

export default MessageParser;
