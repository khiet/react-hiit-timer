export const convertHMS = (second: string | number) => {
  const parsedSecond = parseInt(second.toString(), 10);

  const hours = Math.floor(parsedSecond / 3600);
  const minutes = Math.floor((parsedSecond - (hours * 3600)) / 60);
  const seconds = parsedSecond - (hours * 3600) - (minutes * 60);

  const labeledHours = (hours < 10) ? `0${hours}` : hours.toString();
  const labeledMinutes = (minutes < 10) ? `0${minutes}` : minutes.toString();
  const labeledSeconds = (seconds < 10) ? `0${seconds}` : seconds.toString();

  return `${labeledHours === '00' ? '' : `${labeledHours}:`}${labeledMinutes}:${labeledSeconds}`;
};

export const calcSum = (
  work: number,
  rest: number,
  exercise: number,
  round: number,
) => (((work + rest) * exercise * round) - rest);
