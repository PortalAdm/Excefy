import { MouseEvent, useEffect, useRef, useState } from 'react';
import { BiChat } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { CopilotChatSubmit } from './Submit';
import { CopilotChatMessage } from './Message';
import { useCopilotChatCompletion } from '../../hooks/useCopilotChatCompletion';

type Message = { sender: 'me' | 'copilot'; message: string };

type Props = {
  onHeaderMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
  onNewMessageAdded: () => void;
  onClose: () => void;
};

export function CopilotChat({ onHeaderMouseDown, onNewMessageAdded, onClose }: Props) {
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { sender: 'copilot', message: 'Como posso ajudar?' }
  ]);
  const historyEndRef = useRef<HTMLDivElement>(null);

  const [isCopilotTyping, setIsCopilotTyping] = useState(false);

  const chatCompletion = useCopilotChatCompletion();

  useEffect(() => {
    onNewMessageAdded();

    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatHistory, isCopilotTyping]);

  async function sendMessage(question: string) {
    setChatHistory((history) => [...history, { sender: 'me', message: question }]);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      setIsCopilotTyping(true);

      const { response } = await chatCompletion(question);

      setChatHistory((history) => [...history, { sender: 'copilot', message: response }]);
    } catch (error) {
      setChatHistory((history) => [
        ...history,
        { sender: 'copilot', message: 'Ocorreu um erro na resposta... Tente novamente.' }
      ]);
    } finally {
      setIsCopilotTyping(false);
    }
  }

  return (
    <div className="shadow-lg rounded-lg bg-white border border-[#b6b6b6] overflow-hidden flex flex-col min-w-[380px] max-h-[80vh]">
      <header
        className="select-none relative flex justify-center px-4 py-2.5 bg-primary text-white cursor-move"
        onMouseDown={onHeaderMouseDown}
      >
        <div className="flex items-center gap-2">
          <BiChat strokeWidth={1.1} />
          <span className="font-bold">Copilot</span>
        </div>

        <button
          type="button"
          className="transition-opacity hover:opacity-100 opacity-70 absolute right-4 top-1/2 -translate-y-1/2"
          onClick={onClose}
        >
          <IoClose className="w-6 h-6" />
        </button>
      </header>

      <div className="min-h-[320px] max-h-[500px] overflow-y-auto p-4 space-y-2 text-sm">
        {chatHistory.map(({ sender, message }, index) => (
          <CopilotChatMessage key={`${sender}-${index}`} sender={sender}>
            {message}
          </CopilotChatMessage>
        ))}

        {isCopilotTyping && <CopilotChatMessage sender="copilot" isTypingMessage />}

        <div ref={historyEndRef} />
      </div>

      <footer className="p-2 border-t border-t-black/5">
        <CopilotChatSubmit onSubmit={sendMessage} isLoading={isCopilotTyping} />
      </footer>
    </div>
  );
}
