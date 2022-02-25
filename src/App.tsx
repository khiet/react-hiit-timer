import { useReducer, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditableLabel } from './EditableLabel';

import { convertHMS } from './helpers/time';

type HiitInterval = {
  work: number,
  rest: number,
  exercise: number,
  round: number,
}

type HiitIntervalReducerAction = {
  type: string;
  value: number;
}

const INITIAL_STATE: HiitInterval = {
  work: 30,
  rest: 20,
  exercise: 4,
  round: 3,
};

function intervalReducer(
  intervalState: HiitInterval,
  action: HiitIntervalReducerAction,
) {
  switch (action.type) {
    case 'work':
      return { ...intervalState, work: action.value };
    case 'rest':
      return { ...intervalState, rest: action.value };
    case 'exercise':
      return { ...intervalState, exercise: action.value };
    case 'round':
      return { ...intervalState, round: action.value };
    default:
      return intervalState;
  }
}

const TimerSum = ({ sum }: { sum: number }) => (
  <h1>{convertHMS(sum.toString())}</h1>
);

const PlayButton = ({ intervalState, sum }: { intervalState: HiitInterval, sum: number }) => {
  const params = new URLSearchParams({
    work: intervalState.work.toString(),
    rest: intervalState.rest.toString(),
    exercise: intervalState.exercise.toString(),
    round: intervalState.round.toString(),
    sum: sum.toString(),
  });

  return (
    <Link to={`/play/?${params.toString()}`}>PLAY</Link>
  );
};

export const App = () => {
  const [intervalState, dispatch] = useReducer(intervalReducer, INITIAL_STATE);
  const [sum, setSum] = useState(0);

  const onIntervalChange = (type: string, value: string) => {
    dispatch({ type, value: parseInt(value, 10) });
  };

  const calcIntervalSum = () => {
    const {
      work, rest, exercise, round,
    } = intervalState;

    setSum((work + rest) * exercise * round);
  };

  useEffect(() => {
    calcIntervalSum();
  }, [intervalState]);

  return (
    <div>
      <TimerSum sum={sum} />
      <PlayButton intervalState={intervalState} sum={sum} />
      <EditableLabel
        title="work"
        value={intervalState.work}
        onChange={(labelValue: string) => onIntervalChange('work', labelValue)}
      />
      <EditableLabel
        title="rest"
        value={intervalState.rest}
        onChange={(labelValue: string) => onIntervalChange('rest', labelValue)}
      />
      <EditableLabel
        title="exercise"
        value={intervalState.exercise}
        onChange={(labelValue: string) => onIntervalChange('exercise', labelValue)}
      />
      <EditableLabel
        title="round"
        value={intervalState.round}
        onChange={(labelValue: string) => onIntervalChange('round', labelValue)}
      />
    </div>
  );
};
