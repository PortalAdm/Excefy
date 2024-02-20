'use client';

import { userSession } from '~/src/app/shared/utils/constants/userSession';
import { useLocalStorage } from '~shared/hooks/useLocalStorage';
import { capitalizeName } from '~shared/utils/transformers';
import { Text } from '../../Text';

export function HeaderLabel() {
  const { getLocalStorage } = useLocalStorage();

  const userData = getLocalStorage(userSession);

  const username = capitalizeName(userData.username) || '';

  return <Text text={`Olá, ${username}`} size="md" color="primary" />;
}
