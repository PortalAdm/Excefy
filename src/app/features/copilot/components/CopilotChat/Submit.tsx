import { KeyboardEvent, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

type Props = {
  onSubmit: (question: string) => void;
  isLoading: boolean;
};

export function CopilotChatSubmit({ onSubmit, isLoading }: Props) {
  const [questionText, setQuestionText] = useState('');

  const isValidQuestionText = !!questionText.trim().length;

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'Enter' || (event.key === 'Enter' && event.shiftKey)) {
      return;
    }

    event.preventDefault();
    preSubmit();
  }

  function preSubmit() {
    if (!isValidQuestionText || isLoading) {
      return;
    }

    onSubmit(questionText);
    setQuestionText('');
  }

  return (
    <div className="flex h-fit p-2 rounded-md focus-within:bg-black/5 hover:bg-black/5 transition-colors">
      <textarea
        value={questionText}
        onChange={(event) => setQuestionText(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua pergunta..."
        className="flex-1 bg-transparent min-h-[50px] max-h-[300px] overflow-y-auto resize-none text-sm placeholder:text-sm outline-none"
      />

      <button
        type="button"
        className="text-[#1e2939] disabled:opacity-60 disabled:pointer-events-none transition-colors hover:text-primary w-6 h-6"
        onClick={preSubmit}
        disabled={!isValidQuestionText || isLoading}
      >
        <IoIosSend className="w-full h-full" />
      </button>
    </div>
  );
}
