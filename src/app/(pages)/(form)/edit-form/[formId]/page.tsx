'use client';

import { FormSchema } from '~/src/app/shared/types/FormItem';
import { FormPanel } from '../../FormPanel';

export default function EditFormPage() {
  function handleSave(formSchema: FormSchema) {
    console.log('salvando schema editado', formSchema);
  }

  return <FormPanel name="EDITANDO" onSave={handleSave} />;
}
