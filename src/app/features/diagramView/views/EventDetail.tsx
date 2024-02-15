import { forwardRef, memo } from 'react';
import { Text } from '~/src/app/shared/components/Text';

interface EventDetailProps {}

const EventDetail = forwardRef<HTMLDivElement, EventDetailProps>(
  ({ ...props }, propertiesPanelRef) => {
    return (
      <div
        {...props}
        id="properties"
        ref={propertiesPanelRef}
        className="absolute bg-white ring-1 ring-primary w-68 max-h-[650px] overflow-y-scroll right-0 z-20"
      >
        <div className="relative h-10 w-full bg-primary left-0 flex p-2 items-center mb-2">
          <Text text="Detalhes do Evento" color="white" size="md" weigth="bold" />
        </div>
      </div>
    );
  }
);

export default memo(EventDetail);

EventDetail.displayName = 'EventDetail';
