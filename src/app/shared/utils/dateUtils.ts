import * as dateFNS from 'date-fns';

export const formatDate = (date: Date | null, format = 'dd-MM-yyyy') => {
  if (!date) return;

  return dateFNS.format(date, format);
};
