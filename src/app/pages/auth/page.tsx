import { authTV } from '~features/auth/AuthTV';
import { Auth } from '~features/auth';

export default function AuthPage() {
  return (
    <div className={authTV()}>
      <Auth.hero />
      <Auth.forms />
    </div>
  );
}
