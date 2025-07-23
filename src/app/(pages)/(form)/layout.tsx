import { Toast } from '../../features/toast';
import { Providers } from '../../providers';
import { NavBar } from './NavBar';

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>Execfy | Novo Formulário</title>
      <Providers>
        <Toast.root>
          <Toast.header />
          <Toast.info />
        </Toast.root>
        <NavBar />
        {children}
      </Providers>
    </>
  );
}
