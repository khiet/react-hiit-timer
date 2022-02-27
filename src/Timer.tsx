import { useState, useEffect } from 'react';
import useSound from 'use-sound';

import countDownSound from './assets/sounds/boop.mp3';
import countDownFinishSound from './assets/sounds/pop-up-off.mp3';

export const Timer = ({ interval, onTick, onFinish }: {
  interval: number,
  onTick: () => void,
  onFinish: () => void
}) => {
  const [time, setTime] = useState<number>(interval);
  const [playCowntDown] = useSound(countDownSound);
  const [playCowntDownFinish] = useSound(countDownFinishSound);

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
      playCowntDownFinish();

      onFinish();
    } else {
      if (time <= 5) {
        playCowntDown();
      }

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
