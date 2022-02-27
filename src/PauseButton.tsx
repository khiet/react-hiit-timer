import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePause, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Box } from './common/Box';
import { Theme } from './styles/theme';

export const PauseButton = ({
  size,
  onClick,
}:{
  size: number;
  onClick: () => void;
}) => {
  const [paused, setPaused] = useState<boolean>(false);

  if (paused) {
    return (
      <Box
        width={size}
        height={size}
        color={Theme.colors.white}
        as={FontAwesomeIcon}
        icon={faCirclePlay}
        mx={4}
        onClick={() => setPaused(false)}
        cursor="pointer"
      />
    );
  }

  return (
    <Box
      onClick={() => {
        setPaused(true);

        onClick();
      }}
      width={size}
      height={size}
      color={Theme.colors.white}
      as={FontAwesomeIcon}
      icon={faCirclePause}
      cursor="pointer"
    />
  );
};
