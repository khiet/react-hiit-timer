import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Timer } from './Timer';
import { convertHMS } from './helpers/time';
import { StepCard } from './StepCard';

const DebugInfo = ({
  workInterval,
  restInterval,
  exercise,
  round,
  sum,
}: {
  workInterval: number;
  restInterval: number;
  exercise: number;
  round: number;
  sum: number;
}) => (
  <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
    <div>Work: {workInterval}</div>
    <div>Rest: {restInterval}</div>
    <div>Excercises: {exercise}</div>
    <div>Rounds: {round}</div>
    <div>Sum: {convertHMS(sum.toString())}</div>
  </div>
);

export const Play = () => {
  const [searchParams] = useSearchParams();

  const exerciseParam = searchParams.get('exercise');
  const roundParam = searchParams.get('round');
  const workParam = searchParams.get('work');
  const restParam = searchParams.get('rest');
  const sumParam = searchParams.get('sum');

  if (exerciseParam === null || roundParam === null || workParam === null || restParam === null || sumParam === null) {
    return null;
  }

  const originalExercise = useRef(parseInt(exerciseParam, 10));
  const originalRound = useRef(parseInt(roundParam, 10));

  const workInterval = parseInt(workParam, 10);
  const restInterval = parseInt(restParam, 10);

  const firstUpdate = useRef(true);

  const [finished, setFinished] = useState(false);
  const [sum, setSum] = useState(parseInt(sumParam, 10));

  const [isWork, setIsWork] = useState(true);
  const [exercise, setExercise] = useState(originalExercise.current);
  const [round, setRound] = useState(originalRound.current);

  useEffect(() => {
    setSum((workInterval + restInterval) * exercise * round);
  }, []);

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
    if (round === 0) {
      setFinished(true);
    }
  }, [round]);

  if (finished) {
    return (
      <div>FINISHED</div>
    );
  }

  return (
    <div>
      <DebugInfo
        workInterval={workInterval}
        restInterval={restInterval}
        exercise={exercise}
        round={round}
        sum={sum}
      />
      <div>
        <h1>{isWork ? 'Work' : 'Rest'}</h1>
        <Timer
          interval={isWork ? workInterval : restInterval}
          key={isWork ? 'work' : 'rest'}
          onTick={() => {
            setSum(sum - 1);
          }}
          onFinish={() => {
            setIsWork(!isWork);
          }}
        />
      </div>
      <StepCard label="Excercise" current={exercise} total={originalExercise.current} />
      <StepCard label="Round" current={round} total={originalRound.current} />
    </div>
  );
};
