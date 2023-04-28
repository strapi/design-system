import * as React from 'react';

import { Clock } from '@strapi/icons';
import styled from 'styled-components';

import { ComboboxInput, ComboboxInputProps, Option } from '../Combobox/Combobox';
import { useDesignSystem } from '../DesignSystemProvider';
import { Field, FieldError, FieldHint, FieldLabel, FieldProps } from '../Field';
import { Flex } from '../Flex';
import { useDateFormatter } from '../hooks/useDateFormatter';
import { useId } from '../hooks/useId';

/* -------------------------------------------------------------------------------------------------
 * TimePickerInput
 * -----------------------------------------------------------------------------------------------*/

export interface TimePickerInputProps
  extends Omit<ComboboxInputProps, 'children' | 'autocomplete' | 'startIcon' | 'placeholder' | 'allowCustomValue'> {
  /**
   * @default 15
   */
  step?: number;
  /**
   * @deprecated This is no longer used.
   */
  ariaLabel?: string;
  /**
   * @preserve
   * @deprecated This is no longer used.
   */
  selectButtonTitle?: string;
}

export const TimePickerInput = ({
  id,
  step = 15,
  /**
   * @preserve
   * @deprecated This is no longer used.
   */
  ariaLabel: _ariaLabel,
  /**
   * @preserve
   * @deprecated This is no longer used.
   */
  selectButtonTitle: _selectButtonTitle,
  ...restProps
}: TimePickerInputProps) => {
  const context = useDesignSystem('TimePicker');
  const generatedId = useId(id);

  const formatter = useDateFormatter(context.locale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const timeOptions = React.useMemo(() => {
    const stepCount = 60 / step;

    return [...Array(24).keys()].flatMap((hour) =>
      [...Array(stepCount).keys()].map((minuteStep) => formatter.format(new Date(0, 0, 0, hour, minuteStep * step))),
    );
  }, [step, formatter]);

  return (
    <ComboboxInput
      {...restProps}
      allowCustomValue
      placeholder="--:--"
      autocomplete="none"
      startIcon={<StyledClock />}
      id={generatedId}
    >
      {timeOptions.map((time) => (
        <Option key={time} value={time}>
          {time}
        </Option>
      ))}
    </ComboboxInput>
  );
};

const StyledClock = styled(Clock)`
  height: 1rem;
  width: 1rem;

  & > path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

/* -------------------------------------------------------------------------------------------------
 * TimePicker
 * -----------------------------------------------------------------------------------------------*/

export interface TimePickerProps extends TimePickerInputProps, Pick<FieldProps, 'hint'> {
  label: string;
  labelAction?: React.ReactNode;
}

export const TimePicker = ({ label, error, hint, id, required, labelAction, ...restProps }: TimePickerProps) => {
  const generatedId = useId(id);

  return (
    <Field hint={hint} error={error} id={generatedId} required={required}>
      <Flex direction="column" alignItems="stretch" gap={1}>
        <FieldLabel action={labelAction}>{label}</FieldLabel>
        <TimePickerInput id={generatedId} error={error} required={required} {...restProps} />
        <FieldHint />
        <FieldError />
      </Flex>
    </Field>
  );
};
