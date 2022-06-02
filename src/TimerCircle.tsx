import { useState } from 'react';
import { useInterval } from './hooks/useInterval';
import { Theme } from './styles/theme';

const RADIUS = 150;
const CIRCUMFERENCE = 2 * RADIUS * Math.PI;
const PROGRESS_STEP_MS = 50;

export const TimerCircle = ({
  size,
  time,
} : {
  size: number,
  time: number,
}) => {
  const center = size / 2;
  const [progress, setProgress] = useState<number>(0);

  useInterval(() => {
    setProgress((p) => p + (PROGRESS_STEP_MS / (time * 1000)));
  }, PROGRESS_STEP_MS);

  return (
    <svg width={size} height={size}>
      <g transform={`rotate(-90 ${center} ${center})`}>
        <circle
          r={RADIUS}
          cx={center}
          cy={center}
          fill="transparent"
          stroke={Theme.colors.white}
          strokeWidth="16"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={0}
        />
        <circle
          r={RADIUS}
          cx={center}
          cy={center}
          fill="transparent"
          stroke={Theme.colors.grey}
          strokeWidth="16"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={-(Math.floor(progress * CIRCUMFERENCE))}
        />
      </g>
    </svg>
  );
};
