'use client';

import { useState } from 'react';
import { RecoveryForm } from './RecoveryForm';
import { AuthForm } from './AuthForm';

export function FormsComponent() {
  const [isRecovery, setIsRecovery] = useState(false);

  const handleForgetPassword = () => setIsRecovery((isRecovery) => !isRecovery);

  return isRecovery ? (
    <RecoveryForm handleForgetPassword={handleForgetPassword} />
  ) : (
    <AuthForm handleForgetPassword={handleForgetPassword} />
  );
}
