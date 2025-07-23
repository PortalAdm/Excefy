import { TRootComponent } from '~/src/app/shared/types';
import { projectRootTv } from '../ProjectTV';

export function ProjectRoot({ children }: TRootComponent) {
  return <div className={projectRootTv()}>{children}</div>;
}
