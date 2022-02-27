import React, { useState } from 'react';
import { Box } from './common/Box';
import { Form, Input } from './common/Form';

export const EditableLabelInput = ({ value, onSubmit } : {
  value: number,
  // eslint-disable-next-line no-unused-vars
  onSubmit: (passedValue: string) => void
}) => {
  const [labelValue, setlabelValue] = useState<number>(value);

  const onFormSubmit = () => onSubmit(labelValue.toString());
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setlabelValue(parseInt(e.target.value, 10));

  return (
    <Form onSubmit={onFormSubmit}>
      <Box display="flex">
        <Box mr={1} as={Input} onChange={onInputChange} flexGrow={1} type="number" value={labelValue} />
        <Box as={Input} type="submit" value="Set" />
      </Box>
    </Form>
  );
};
