export const calculateReadingTime = (content: string) => {
  const wpm = 200;
  const numWords = content.split(/\s/g).length;
  const minutes = numWords / wpm;
  return Math.ceil(minutes);
};

const getDay = (date: Date, zeroPadDate?: boolean): string => {
  const day = date.getDate();
  if (day < 10 && zeroPadDate) {
    return `0${day}`;
  }
  return `${day}`;
};

const getYear = (date: Date, abbreviateYear?: boolean): string => {
  const year = date.getFullYear();
  if (abbreviateYear) {
    return `'${year.toString().slice(2)}`;
  }
  return `${year}`;
};

export const formatDate = (
  date: Date,
  abbreviateYear?: boolean,
  zeroPadDate?: boolean,
) => {
  const monthShort = date.toLocaleDateString('en-US', { month: 'short' });
  const day = getDay(date, zeroPadDate);
  const year = date.getFullYear();
  let yearValue =
    abbreviateYear || year !== new Date().getFullYear()
      ? getYear(date, abbreviateYear)
      : '';

  return `${day} ${monthShort} ${yearValue}`;
};

export const formatDateFull = (date: Date) => {
  const monthLong = date.toLocaleDateString('en-US', { month: 'long' });
  const day = getDay(date);
  const year = date.getFullYear();

  return `${day} ${monthLong} ${year}`;
};
