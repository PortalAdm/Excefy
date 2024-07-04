export type TMessage = {
  author: string;
  type: string;
  data: {
    text?: string;
    file?: File;
  };
};
