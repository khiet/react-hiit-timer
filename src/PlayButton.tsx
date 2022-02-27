import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Box } from './common/Box';
import { HiitInterval } from './App';
import { Theme } from './styles/theme';

export const PlayButton = ({
  intervalState,
  size,
}: {
  intervalState: HiitInterval;
  size: number;
}) => {
  const params = new URLSearchParams({
    prepare: intervalState.prepare.toString(),
    work: intervalState.work.toString(),
    rest: intervalState.rest.toString(),
    exercise: intervalState.exercise.toString(),
    round: intervalState.round.toString(),
  });

  return (
    <Link to={`/play/?${params.toString()}`}>
      <Box width={size} height={size} color={Theme.colors.white} as={FontAwesomeIcon} icon={faCirclePlay} />
    </Link>
  );
};
