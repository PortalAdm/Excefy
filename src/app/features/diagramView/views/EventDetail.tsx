import { forwardRef, memo } from 'react';
import {
  EventDetailContentTv,
  EventDetailRootTv
} from '~/src/app/features/diagramView/DiagramViewTV';
import { Text } from '~/src/app/shared/components/Text';

interface EventDetailProps {}

const EventDetail = forwardRef<HTMLDivElement, EventDetailProps>(
  ({ ...props }, propertiesPanelRef) => {
    return (
      <div {...props} id="properties" ref={propertiesPanelRef} className={EventDetailRootTv()}>
        <div className={EventDetailContentTv()}>
          <Text text="Detalhes do Evento" color="white" size="md" weigth="bold" />
        </div>
      </div>
    );
  }
);

export default memo(EventDetail);

EventDetail.displayName = 'EventDetail';
