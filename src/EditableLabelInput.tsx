import React, { useState } from 'react';

export const EditableLabelInput = ({ value, onSubmit } : {
  value: number,
  // eslint-disable-next-line no-unused-vars
  onSubmit: (passedValue: string) => void
}) => {
  const [labelValue, setlabelValue] = useState<number>(value);

  const onFormSubmit = () => onSubmit(labelValue.toString());
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setlabelValue(parseInt(e.target.value, 10));

  return (
    <form onSubmit={onFormSubmit}>
      <input onChange={onInputChange} type="number" value={labelValue} />
      <input type="submit" value="DONE" />
    </form>
  );
};
