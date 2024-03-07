'use client';

import { useHeaderController } from '~/src/app/features/header/controller';
import { Text } from '~/src/app/shared/components/Text';

export function HeaderLabel() {
  const { username } = useHeaderController();

  return <Text text={`Olá, ${username}`} size="md" color="primary" />;
}
