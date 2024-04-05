import { forwardRef, memo, useState } from 'react';
import * as tv from '~/src/app/features/diagramView/DiagramViewTV';
import { Icon } from '~/src/app/shared/components/Icon';
import { Text } from '~/src/app/shared/components/Text';
import { GiHamburgerMenu } from 'react-icons/gi';

interface EventDetailProps {}

const EventDetail = forwardRef<HTMLDivElement, EventDetailProps>(
  ({ ...props }, propertiesPanelRef) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const toggleDetails = () => setIsDetailsOpen((prev) => !prev);

    return (
      <>
        <div {...props} className={tv.EventDetailRootTv({ isDetailsOpen })}>
          <div className={tv.EventDetailContentTv()}>
            <Text
              text="Detalhes do Evento"
              color="white"
              size="md"
              weigth="bold"
              className="truncate"
            />
            <button onClick={toggleDetails} className={tv.ToggleDetailsTv()}>
              <Text text="Detalhes" color="white" />
              <Icon icon={GiHamburgerMenu} color="white" size="medium" className="rotate-90" />
            </button>
          </div>
          <div className={tv.EventDetailContentWrapperTv()}>
            <div id="properties" ref={propertiesPanelRef} />
          </div>
        </div>
      </>
    );
  }
);

export default memo(EventDetail);

EventDetail.displayName = 'EventDetail';
