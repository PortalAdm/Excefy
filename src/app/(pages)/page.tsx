import { Auth } from '~/src/app/features/auth';
import { authTV } from '~/src/app/features/auth/AuthTV';

export default function Home() {
  return (
    <div className={authTV()}>
      <Auth.hero />
      <Auth.forms />
    </div>
  );
}
