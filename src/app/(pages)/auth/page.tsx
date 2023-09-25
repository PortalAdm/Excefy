import { authTV } from '~features/auth/AuthTV';
import { Auth } from '~features/auth';

export default function AuthPage() {
  // lógica de autenticação deve vir aqui
  return (
    <div className={authTV()}>
      <Auth.hero />
      <Auth.forms />
    </div>
  );
}
