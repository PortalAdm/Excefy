import { forwardRef, memo } from 'react';
import { bpmnCanvasTv } from '../../DiagramViewTV';
import { TRootComponent } from '~/src/app/shared/types';

interface ICanvaProps extends TRootComponent {}

const Canva = forwardRef<HTMLDivElement, ICanvaProps>(({ children, ...props }, canvaRef) => {
  return (
    <div {...props} className={bpmnCanvasTv()} id="canvas" ref={canvaRef}>
      {children}
    </div>
  );
});

export default memo(Canva);

Canva.displayName = 'Canva';
