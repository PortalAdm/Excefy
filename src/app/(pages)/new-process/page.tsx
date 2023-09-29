import { BpmnView } from '~features/diagramView';

export default function newProcesspage() {
  return (
    <div className="w-screen h-screen flex justify-center">
      <BpmnView />
    </div>
  );
}
