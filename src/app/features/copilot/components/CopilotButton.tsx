import { ComponentProps } from 'react';
import { BiChat } from 'react-icons/bi';

type Props = Omit<ComponentProps<'button'>, 'type' | 'children'>;

export function CopilotButton(props: Props) {
  return (
    <button
      type="button"
      className="flex shadow-lg items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:brightness-110 transition-all text-white"
      {...props}
    >
      <BiChat strokeWidth={1.1} />
      <span className="font-bold">Copilot</span>
    </button>
  );
}
