export type FormItem = {
  id: string;
  name: string;
  schema: FormSchema;
};

export type FormSchema = {
  components: FormComponent[];
  id: string;
  schemaVersion: number;
  type: 'default';
};

export type FormComponent = {
  id: string;
  key: string;
  label: string;
  layout: { row: string; columns: null };
  type: string;
  showOutline?: boolean;
  components?: FormComponent[];
};
