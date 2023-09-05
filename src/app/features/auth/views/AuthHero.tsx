import Image from 'next/image';
import { blurDataURL } from '~/src/app/shared/utils/constants/blurDataURL';
import { authHeroTv } from '../AuthTV';

const mockedimage =
  'https://images.unsplash.com/photo-1682685797439-a05dd915cee9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60';

export function AuthHero() {
  return (
    <div className={authHeroTv()}>
      <Image src={mockedimage} fill alt="alt" placeholder="blur" blurDataURL={blurDataURL} />
    </div>
  );
}
