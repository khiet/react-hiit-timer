/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';

import { EditableLabelInput } from './EditableLabelInput';

export const EditableLabel = ({ title, value, onChange }: {
  title: string,
  value: number,
  // eslint-disable-next-line no-unused-vars
  onChange: (labelValue: string) => void
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
    <div
      onClick={() => setShowInput(!showInput)}
    >
      {title} {value}
    </div>
  );
};
