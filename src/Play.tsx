import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Timer } from './Timer';
import { TimerCircle } from './TimerCircle';
import { calcSum, convertHMS } from './helpers/time';
import { StepCard } from './StepCard';
import { Box } from './common/Box';
import { Finish } from './Finish';
import { Theme } from './styles/theme';
import { Typography } from './common/Typography';
import { TimeRemaning } from './TimeRemaining';
import { PauseButton } from './PauseButton';

// eslint-disable-next-line no-unused-vars
const DebugInfo = ({
  prepare,
  workInterval,
  restInterval,
  exercise,
  round,
  sum,
}: {
  prepare: number;
  workInterval: number;
  restInterval: number;
  exercise: number;
  round: number;
  sum: number;
}) => (
  <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
    <div>Prepare: {prepare}</div>
    <div>Work: {workInterval}</div>
    <div>Rest: {restInterval}</div>
    <div>Excercises: {exercise}</div>
    <div>Rounds: {round}</div>
    <div>Sum: {convertHMS(sum)}</div>
  </div>
);

const bgColor = (isPreparing: boolean, isWork: boolean) => {
  if (isPreparing) {
    return Theme.colors.yellow;
  }

  return isWork ? Theme.colors.turquoise : Theme.colors.red;
};

const title = (isPreparing: boolean, isWork: boolean) => {
  if (isPreparing) {
    return 'Prepare';
  }

  return isWork ? 'Work' : 'Rest';
};

export const Play = () => {
  const [searchParams] = useSearchParams();

  const exerciseParam = searchParams.get('exercise');
  const roundParam = searchParams.get('round');
  const prepareParam = searchParams.get('prepare');
  const workParam = searchParams.get('work');
  const restParam = searchParams.get('rest');

  if (exerciseParam === null || roundParam === null || prepareParam === null || workParam === null || restParam === null) {
    return null;
  }

  const originalPrepare = parseInt(prepareParam, 10);
  const originalWork = parseInt(workParam, 10);
  const originalRest = parseInt(restParam, 10);
  const originalExercise = useRef(parseInt(exerciseParam, 10));
  const originalRound = useRef(parseInt(roundParam, 10));
  const originalSum = calcSum(
    originalWork,
    originalRest,
    originalExercise.current,
    originalRound.current,
  );

  const firstUpdate = useRef(true);
  const firstTick = useRef(true);

  const [finished, setFinished] = useState(false);
  const [sum, setSum] = useState(originalSum);

  const [isPreparing, setIsPreparing] = useState(true);
  const [isWork, setIsWork] = useState(true);
  const [exercise, setExercise] = useState(originalExercise.current);
  const [round, setRound] = useState(originalRound.current);

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (isWork && !firstUpdate.current) {
      setExercise(exercise - 1);
    }

    firstUpdate.current = false;
  }, [isWork]);

  useEffect(() => {
    if (exercise === 0) {
      setExercise(originalExercise.current);
      setRound(round - 1);
    }
  }, [exercise]);

  useEffect(() => {
    if (sum === 0) {
      setFinished(true);
    }
  }, [sum]);

  if (finished) {
    return (
      <Finish />
    );
  }

  return (
    <Box py={4} px={2} backgroundColor={bgColor(isPreparing, isWork)}>
      <Typography fontSize={4} textAlign="center" fontWeight="bold" color={Theme.colors.white}>
        {title(isPreparing, isWork)}
      </Typography>
      <Box mt={3}>
        <StepCard label="Excercise" current={exercise} total={originalExercise.current} />
        <StepCard label="Round" current={round} total={originalRound.current} />
      </Box>
      <Box my={2} display="flex" justifyContent="center">
        {isPreparing ? (
          <Box key="prepare" position="relative">
            <TimerCircle size={400} time={originalPrepare} paused={paused} />
            <Box position="absolute" top={150} left={100}>
              <Timer
                interval={originalPrepare}
                onFinish={() => {
                  setIsPreparing(false);
                }}
                paused={paused}
              />
            </Box>
          </Box>
        ) : (
          <Box key={isWork ? 'work' : 'rest'} position="relative">
            <TimerCircle size={400} time={isWork ? originalWork : originalRest} paused={paused} />
            <Box position="absolute" top={150} left={100}>
              <Timer
                interval={isWork ? originalWork : originalRest}
                onTick={() => {
                  if (!firstTick.current) {
                    setSum((s) => s - 1);
                  } else {
                    firstTick.current = false;
                  }
                }}
                onFinish={() => {
                  setIsWork(!isWork);
                }}
                paused={paused}
              />
            </Box>
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="center">
        <PauseButton
          size={80}
          onClick={() => setPaused(!paused)}
        />
      </Box>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography
          mt={2}
          textAlign="center"
          fontWeight="bold"
          color={Theme.colors.white}
        >
          CANCEL
        </Typography>
      </Link>
      <Box mt={2}>
        <TimeRemaning sum={sum} />
      </Box>
    </Box>
  );
};
