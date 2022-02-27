/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Box } from './common/Box';
import { Typography } from './common/Typography';

import { EditableLabelInput } from './EditableLabelInput';
import { convertHMS } from './helpers/time';

export const EditableLabel = ({
  title,
  value,
  onChange,
  bgColor,
}: {
  title: string,
  value: number,
  // eslint-disable-next-line no-unused-vars
  onChange: (labelValue: string) => void,
  bgColor: string,
}) => {
  const [showInput, setShowInput] = useState<boolean>(false);

  const onLabelChange = (labelValue: string) => {
    setShowInput(false);
    onChange(labelValue);
  };

  if (showInput) {
    return (<EditableLabelInput value={value} onSubmit={onLabelChange} />);
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      p={3}
      backgroundColor={bgColor}
      borderRadius={8}
      onClick={() => setShowInput(!showInput)}
    >
      <Typography fontSize={3} fontWeight="bold">
        {title}
      </Typography>
      <Typography fontSize={3} fontWeight="bold">
        {convertHMS(value)}
      </Typography>
    </Box>
  );
};
