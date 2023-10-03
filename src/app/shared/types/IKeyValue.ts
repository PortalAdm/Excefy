import { ReactNode } from 'react';

export interface KeyValue {
  [key: string]: string | number | boolean | ReactNode | null;
}
