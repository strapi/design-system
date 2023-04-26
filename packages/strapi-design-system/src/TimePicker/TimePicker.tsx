import { Clock } from '@strapi/icons';
import styled from 'styled-components';

import { Flex } from '../Flex';
import { useId } from '../hooks/useId';
import { SingleSelect, SingleSelectOption, SingleSelectProps } from '../Select/SingleSelect';

export interface TimePickerProps extends Omit<SingleSelectProps, 'children' | 'onChange' | 'value'> {
  onChange: (value: string) => void;
  /**
   * @default 15
   */
  step?: number;
  value?: string;
}

export const TimePicker = ({ id, value, step = 15, onChange, ...props }: TimePickerProps) => {
  const generatedId = useId(id);
  const hoursCount = 24;
  const times: string[] = [];
  let min = 0;

  for (let i = 0; i < hoursCount; i++) {
    min = 0;

    while (min < 60) {
      times.push(`${i < 10 ? `0${i}` : i}:${min < 10 ? `0${min}` : min}`);
      min += step;
    }
  }

  // The time picker will select the closest value in the list.
  // This is a temporary fix.
  // This whole thing needs refactoring – it's nonsensical.
  const getClosestValue = () => {
    const [valueHours, valueMinutes] = value?.split(':') ?? [];

    const hours = times.reduce((prev, curr) => {
      const [h] = curr.split(':');

      // @ts-expect-error this is gonna be refactored in an upcoming initiative
      return Math.abs(h - valueHours) < Math.abs(prev - valueHours) ? h : prev;
    }, times[0].split(':')[0]);

    const minutes = times.reduce((prev, curr) => {
      const minutes = curr.split(':')[1];

      // @ts-expect-error this is gonna be refactored in an upcoming initiative
      return Math.abs(minutes - valueMinutes) < Math.abs(prev - valueMinutes) ? minutes : prev;
    }, times[0].split(':')[1]);

    return `${hours}:${minutes}`;
  };

  const handleChange = (value: string | number | string[]) => {
    if (onChange) {
      onChange(value.toString());
    }
  };

  return (
    <SingleSelect
      id={generatedId}
      placeholder="--:--"
      value={value ? getClosestValue() : undefined}
      startIcon={
        <TimeIconWrapper as="span">
          <Clock />
        </TimeIconWrapper>
      }
      onChange={handleChange}
      {...props}
    >
      {times.map((time) => (
        <SingleSelectOption value={time} key={time}>
          {time}
        </SingleSelectOption>
      ))}
    </SingleSelect>
  );
};

const TimeIconWrapper = styled(Flex)`
  & > svg {
    height: 1rem;
    width: 1rem;
  }

  & > svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;
