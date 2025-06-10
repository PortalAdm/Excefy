import { ReactNode, useEffect, useState } from 'react';
import Markdown from 'react-markdown';

type Props = {
  sender: string;
  isTypingMessage?: boolean;
  children?: ReactNode;
};

export function CopilotChatMessage({ sender, isTypingMessage = false, children }: Props) {
  const [typingText, setTypingText] = useState('Digitando');

  useEffect(() => {
    let dots = 0;

    const interval = setInterval(() => {
      dots = (dots + 1) % 4;

      setTypingText('Digitando' + '.'.repeat(dots));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div data-me={sender === 'Você'} className="group flex data-[me=true]:justify-end">
      <div className="max-w-xs px-4 py-2 flex flex-col gap-0.5 rounded-xl bg-[#d1d5dc] text-[#1e2939] group-data-[me=true]:bg-[#6da8ff] group-data-[me=true]:text-white">
        <strong className="tracking-[-0.15px]">{sender}</strong>

        {isTypingMessage && (
          <span className="italic opacity-80 animate-pulse inline-block w-20 select-none">
            {typingText}
          </span>
        )}

        {!isTypingMessage &&
          (typeof children === 'string' ? (
            <span className="prose text-sm text-[#1e2939] leading-normal group-data-[me=true]:text-white">
              <Markdown>{children}</Markdown>
            </span>
          ) : (
            children
          ))}
      </div>
    </div>
  );
}
