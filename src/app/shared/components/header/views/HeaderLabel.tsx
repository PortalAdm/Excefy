'use client';

import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { capitalizeName } from '../../../utils/transformers';
import { Text } from '../../Text';

const session = '_S';

export function HeaderLabel() {
  const { getLocalStorage } = useLocalStorage();

  const userData = getLocalStorage(session);

  const username = capitalizeName(userData.username);

  return <Text text={`Olá, ${username}`} size="md" color="primary" />;
}
