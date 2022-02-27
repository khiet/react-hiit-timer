import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { Box } from './common/Box';
import { Typography } from './common/Typography';
import { Theme } from './styles/theme';

export const Finish = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" backgroundColor={Theme.colors.red}>
    <Box mr={1} width={48} height={48} color={Theme.colors.white} as={FontAwesomeIcon} icon={faHand} />
    <Typography fontSize={6} fontWeight="bold" color={Theme.colors.white}>
      Good job!
    </Typography>
  </Box>
);
