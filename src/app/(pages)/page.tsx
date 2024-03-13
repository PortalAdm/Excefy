import { Auth } from '~/src/app/features/auth';

export default function Home() {
  return (
    <Auth.root>
      <Auth.hero />
      <Auth.forms />
    </Auth.root>
  );
}
