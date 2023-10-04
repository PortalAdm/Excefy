export type ToastType = {
  state: 'success' | 'error';
  isActive: boolean;
  messageTitle?: string;
  messageDescription?: string;
  timeActive?: number;
};
