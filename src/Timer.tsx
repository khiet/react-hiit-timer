import { useState, useEffect } from 'react';

export const Timer = ({ interval, onTick, onFinish }: {
  interval: number,
  onTick: () => void,
  onFinish: () => void
}) => {
  const [time, setTime] = useState(interval);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      onFinish();
    } else {
      onTick();
    }
  }, [time]);

  useEffect(() => {
    setTime(interval);
  }, [interval]);

  return (
    <h2>{time}</h2>
  );
};
