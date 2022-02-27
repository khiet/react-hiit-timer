/* eslint-disable react/no-array-index-key */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Box } from './common/Box';
import { Typography } from './common/Typography';
import { Theme } from './styles/theme';

const StepIcon = ({
  icon,
  color,
}:{
  icon: IconDefinition;
  color: string;
}) => (
  <Box
    ml={1}
    width={16}
    height={16}
    color={color}
    as={FontAwesomeIcon}
    icon={icon}
  />
);

export const StepCard = ({ label, current, total }: {
  label: string,
  current: number,
  total: number
}) => {
  if (current <= 0) {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      p={3}
      mt={1}
      borderWidth={1}
      borderStyle="solid"
      borderColor={Theme.colors.white}
      borderRadius={8}
    >
      <Typography fontSize={2} fontWeight="bold" color={Theme.colors.white}>
        {label}
      </Typography>
      <Box>
        {[...Array(total - current + 1)].map((_, i) => <StepIcon key={i} icon={faCircle} color={Theme.colors.white} />)}
        {[...Array(current - 1)].map((_, i) => <StepIcon key={i} icon={faCircle} color={Theme.colors.grey} />)}
      </Box>
    </Box>
  );
};
