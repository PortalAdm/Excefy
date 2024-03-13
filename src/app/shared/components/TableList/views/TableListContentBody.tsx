import { TRootComponent } from '~/src/app/shared/types';
import { tableListContentBodyTv } from '../TableListTV';

export function TableListContentBody({ children }: TRootComponent) {
  return <tbody className={tableListContentBodyTv()}>{children}</tbody>;
}
