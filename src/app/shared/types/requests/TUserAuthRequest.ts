import { Dispatch, SetStateAction } from 'react';

export type TUserAuthRequest = {
  username: string;
  password: string;
  loadAction: Dispatch<SetStateAction<boolean>>;
  sessionHandler: (key: string, value: unknown) => void;
  errorHandler: (value: SetStateAction<string>) => void;
};
