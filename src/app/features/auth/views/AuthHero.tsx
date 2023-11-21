import { blurDataURL } from '~/src/app/shared/utils/constants/blurDataURL';
import { authHeroTv } from '../AuthTV';
import Image from 'next/image';
import Login from '../../../assets/images/login.png';

export function AuthHero() {
  return (
    <div className={authHeroTv()}>
      <Image src={Login} fill alt="alt" placeholder="blur" blurDataURL={blurDataURL} />
    </div>
  );
}
