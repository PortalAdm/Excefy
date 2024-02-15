import '~global/styles/globals.css';
import { Providers } from '~/src/app/providers';
import { MainContainer } from '~/src/app/shared/components/MainContainer';
import { NavBar } from './NavBar';

export default function NewProcessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>Excefy | Novo Processo</title>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@bpmn-io/properties-panel/dist/assets/properties-panel.css"
      ></link>
      <Providers>
        <MainContainer>
          <div className="flex flex-col w-full h-full">
            <NavBar />
            {children}
          </div>
        </MainContainer>
      </Providers>
    </>
  );
}
