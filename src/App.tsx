import { useReducer } from 'react';
import { Box } from './common/Box';
import { Typography } from './common/Typography';
import { EditableLabel } from './EditableLabel';

import { convertHMS, calcSum } from './helpers/time';
import { PlayButton } from './PlayButton';
import { Theme } from './styles/theme';

export type HiitInterval = {
  prepare: number,
  work: number,
  rest: number,
  exercise: number,
  round: number,
}

export type HiitIntervalReducerAction = {
  type: string;
  value: number;
}

const INITIAL_STATE: HiitInterval = {
  prepare: 30,
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
    case 'prepare':
      return { ...intervalState, prepare: action.value };
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

export const App = () => {
  const [intervalState, dispatch] = useReducer(intervalReducer, INITIAL_STATE);

  const onIntervalChange = (type: string, value: string) => {
    dispatch({ type, value: parseInt(value, 10) });
  };

  const {
    work, rest, exercise, round,
  } = intervalState;
  const sum = calcSum(work, rest, exercise, round);

  return (
    <Box minHeight="100vh" py={4} px={2} backgroundColor={Theme.colors.red}>
      <Typography fontSize={4} textAlign="center" fontWeight="bold" color={Theme.colors.white}>
        Interval Timer
      </Typography>
      <Typography my={5} fontSize={8} textAlign="center" fontWeight="bold" color={Theme.colors.white}>
        {convertHMS(sum)}
      </Typography>
      <Box display="flex" justifyContent="center">
        <PlayButton intervalState={intervalState} size={80} />
      </Box>
      <Box my={1}>
        <EditableLabel
          title="Work"
          value={intervalState.work}
          onChange={(labelValue: string) => onIntervalChange('work', labelValue)}
          bgColor={Theme.colors.lightTurquoise}
        />
      </Box>
      <Box my={1}>
        <EditableLabel
          title="Rest"
          value={intervalState.rest}
          onChange={(labelValue: string) => onIntervalChange('rest', labelValue)}
          bgColor={Theme.colors.lightRed}
        />
      </Box>
      <Box my={1}>
        <EditableLabel
          title="Exercise"
          value={intervalState.exercise}
          onChange={(labelValue: string) => onIntervalChange('exercise', labelValue)}
          bgColor={Theme.colors.lightGrey}
        />
      </Box>
      <Box my={1}>
        <EditableLabel
          title="Round"
          value={intervalState.round}
          onChange={(labelValue: string) => onIntervalChange('round', labelValue)}
          bgColor={Theme.colors.lightPurple}
        />
      </Box>
      <Box my={1}>
        <EditableLabel
          title="Prepare"
          value={intervalState.prepare}
          onChange={(labelValue: string) => onIntervalChange('prepare', labelValue)}
          bgColor={Theme.colors.lightYellow}
        />
      </Box>
    </Box>
  );
};
