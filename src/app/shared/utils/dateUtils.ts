import * as dateFNS from 'date-fns';

export const formatDate = (date: Date | null, format = 'dd/MM/yyyy') => {
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

//Formata a data/hora para o ex: qui às 12:00
export const formatModificationDate = (dateString: string, includeTime: boolean = false) => {
  if (dateString === '') return '';

  const date = new Date(dateString);
  const now = new Date();

  const timeDifference = now.getTime() - date.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  if (minutesDifference < 60) {
    return `Há ${minutesDifference}min`;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  if (includeTime) {
    if (date.toDateString() === today.toDateString()) {
      return `Hoje às ${hours}:${minutes}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Ontem às ${hours}:${minutes}`;
    } else if (date > oneWeekAgo) {
      const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
      const dayOfWeek = days[date.getDay()];
      return `${dayOfWeek} às ${hours}:${minutes}`;
    } else {
      return `${day}/${month} às ${hours}:${minutes}`;
    }
  } else {
    return `${day}/${month}/${year}`;
  }
};
