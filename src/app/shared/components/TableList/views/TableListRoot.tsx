import { tableListRootTv } from '../TableListTV';
import { TRootComponent } from '~/src/app/shared/types';

export function TableListRoot({ children }: TRootComponent) {
  return <table className={tableListRootTv()}>{children}</table>;
}
