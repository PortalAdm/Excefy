import Image, { StaticImageData } from 'next/image';
import { blurDataURL } from '~utils/constants/blurDataURL';
import Link from 'next/link';
import { APP_ROUTES } from '~utils/constants/app-routes';

interface MenuLogoProps {
  src: StaticImageData;
  onClick: () => void;
}

export function MenuLogo({ src, onClick }: MenuLogoProps) {
  return (
    <Link href={APP_ROUTES.private.dashboard.name} onClick={onClick}>
      <Image
        className="hover:brightness-110"
        alt="Logo empresarial"
        width={150}
        height={40}
        src={src}
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    </Link>
  );
}
