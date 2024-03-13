'use client';

import { useNewProcessConfigController } from '~/src/app/features/processConfig/controller';
import { TabsNavigation } from '~/src/app/shared/components/TabsNavigation';

export function ProcessConfigTabsNavigation() {
  const { links } = useNewProcessConfigController();

  return (
    <div className="pb-16">
      <TabsNavigation.root>
        <TabsNavigation.items links={links} />
      </TabsNavigation.root>
    </div>
  );
}
