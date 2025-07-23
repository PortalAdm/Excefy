import '~global/styles/globals.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>Execfy | Painel</title>
      {children}
    </>
  );
}
