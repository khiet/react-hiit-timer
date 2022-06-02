import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePause, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Box } from './common/Box';
import { Theme } from './styles/theme';

const Button = ({
  size,
  paused,
  onClick,
} : {
  size: number;
  paused: boolean;
  onClick: () => void;
}) => (
  <Box
    width={size}
    height={size}
    color={Theme.colors.white}
    as={FontAwesomeIcon}
    icon={paused ? faCirclePause : faCirclePlay}
    cursor="pointer"
    onClick={onClick}
  />
);

export const PlayOrPauseButton = ({
  size,
  onClick,
}:{
  size: number;
  onClick: () => void;
}) => {
  const [paused, setPaused] = useState<boolean>(false);

  return (
    <Button
      size={size}
      paused={paused}
      onClick={() => {
        setPaused(!paused);

        onClick();
      }}
    />
  );
};
