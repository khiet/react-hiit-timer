import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Typography } from './common/Typography';
import { Box } from './common/Box';
import { Theme } from './styles/theme';
import { convertHMS } from './helpers/time';

export const TimeRemaning = ({ sum }: {sum: number}) => (
  <Typography textAlign="center" fontSize={4} fontWeight="bold" color={Theme.colors.white}>
    <Box mr={1} width={24} height={24} color={Theme.colors.white} as={FontAwesomeIcon} icon={faClock} />
    Time Remaining: {convertHMS(sum)}
  </Typography>
);
