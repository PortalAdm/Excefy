import { NavBar } from '~/src/app/(pages)/(process)/NavBar';
import { Toast } from '~/src/app/features/toast';
import { Providers } from '~/src/app/providers';

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>Execfy | Novo Processo</title>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@bpmn-io/properties-panel/dist/assets/properties-panel.css"
      ></link>

      <Providers>
        <Toast />
        <NavBar />
        {children}
      </Providers>
    </>
  );
}
