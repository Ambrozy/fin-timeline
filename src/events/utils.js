const pad = (sec) => ('0' + sec).slice(-2);

export function dateToStr (timestamp) {
  const date = new Date(timestamp);
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${pad(dayOfMonth)}.${pad(month)}.${year} ${pad(hour)}:${pad(minutes)}:${pad(seconds)}`;
}
