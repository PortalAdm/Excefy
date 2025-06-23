'use client';

import { useMemo } from 'react';
import { FormPanel } from '../../../FormPanel';
import { FormSchema } from '~/src/app/shared/types/FormItem';

export default function NewFormPage() {
  const name = useMemo(() => `FORM_${Math.floor(Math.random() * 100)}`, []);

  function handleSave(formSchema: FormSchema) {
    console.log('salvando schema', formSchema);
  }

  return <FormPanel name={name} onSave={handleSave} />;
}
