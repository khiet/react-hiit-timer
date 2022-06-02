import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { Typography } from './common/Typography';
import { convertHMS } from './helpers/time';

import countDownSound from './assets/sounds/boop.mp3';
import countDownFinishSound from './assets/sounds/pop-up-off.mp3';
import { Theme } from './styles/theme';
import { useInterval } from './hooks/useInterval';

export const Timer = ({ interval, onTick, onFinish }: {
  interval: number,
  onTick?: () => void,
  onFinish: () => void
}) => {
  const [time, setTime] = useState<number>(interval);
  const [playCowntDown] = useSound(countDownSound);
  const [playCowntDownFinish] = useSound(countDownFinishSound);

  useInterval(() => {
    setTime((t) => t - 1);
  }, 1000);

  useEffect(() => {
    if (time === 0) {
      playCowntDownFinish();

      onFinish();
    } else {
      if (time <= 3) {
        playCowntDown();
      }

      if (onTick) {
        onTick();
      }
    }
  }, [time]);

  useEffect(() => {
    setTime(interval);
  }, [interval]);

  return (
    <Typography fontSize={8} fontWeight="bold" color={Theme.colors.white}>{convertHMS(time)}</Typography>
  );
};
