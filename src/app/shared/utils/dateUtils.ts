import * as dateFNS from 'date-fns';

export const formatDate = (date: Date | null, format = 'dd-MM-yyyy') => {
  if (!date) return;

  return dateFNS.format(date, format);
};

export const formateHour = (stringDate: string | null) => {
  if (!stringDate) return;

  const formattedTime = (time: number) => (time < 10 ? `0${time}` : time);

  const date = dateFNS.parseISO(stringDate);
  const hour = formattedTime(date.getHours());
  const min = formattedTime(date.getMinutes());
  const sec = formattedTime(date.getSeconds());
  const formattedHour = `${hour}:${min}:${sec}`;

  return formattedHour;
};
