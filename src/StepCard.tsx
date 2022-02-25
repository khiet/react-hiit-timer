/* eslint-disable react/no-array-index-key */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons';

export const StepCard = ({ label, current, total }: {
  label: string,
  current: number,
  total: number
}) => {
  if (current <= 0) {
    return null;
  }

  return (
    <div>
      <div>
        <h2>{label}</h2>
      </div>
      <div>
        {[...Array(total - current + 1)].map((_, i) => <FontAwesomeIcon key={`${i}-current`} icon={faCircle} />)}
        {[...Array(current - 1)].map((_, i) => <FontAwesomeIcon key={`${i}-current`} icon={faCircleDot} />)}
      </div>
    </div>
  );
};
