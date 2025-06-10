import { MouseEvent } from 'react';
import { BiChat } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { CopilotChatSubmit } from './Submit';
import { CopilotChatMessage } from './Message';

type Props = {
  onHeaderMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
  onClose: () => void;
};

export function CopilotChat({ onHeaderMouseDown, onClose }: Props) {
  return (
    <div className="shadow-lg rounded-lg bg-white border border-[#b6b6b6] overflow-hidden flex flex-col min-w-[380px]">
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

      <div className="min-h-[320px] overflow-y-auto p-4 space-y-2 text-sm">
        <CopilotChatMessage sender="Você">
          Texto grande so para ocupar o espcao daqui tgudo gbveleza amigos eess eeu meu prompt
          safado bonito gostoso grande
        </CopilotChatMessage>

        <CopilotChatMessage sender="Copilot">
          Texto grande so para **ocupar** o espcao daqui tgudo gbveleza amigos eess eeu meu prompt
          safado bonito gostoso grande
        </CopilotChatMessage>

        <CopilotChatMessage sender="Copilot" isTypingMessage />
      </div>

      <footer className="p-2 border-t border-t-black/5">
        <CopilotChatSubmit onSubmit={console.log} />
      </footer>
    </div>
  );
}
