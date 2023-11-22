import { DashBoard } from '~features/dashboard';

export default function dashboard() {
  return (
    <div className="p-10 flex flex-col">
      <DashBoard.ProcessList />
    </div>
  );
}
