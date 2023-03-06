import { useState } from 'react';

import { render as renderRTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { TimePicker, TimePickerProps } from '../TimePicker';

const Component = (props: Partial<TimePickerProps>) => {
  const [value, setValue] = useState<string>();

  return (
    <ThemeProvider theme={lightTheme}>
      <TimePicker label="timepicker" value={value} onChange={setValue} {...props} />
    </ThemeProvider>
  );
};

const render = (props?: Partial<TimePickerProps>) => renderRTL(<Component {...props} />);

describe('TimePicker', () => {
  it('should by default have "--:--" as the placeholder', () => {
    const { getByText } = render();

    expect(getByText('--:--')).toBeInTheDocument();
  });

  test('assuming the value is an item in the list it should render accordingly', () => {
    const { getByText } = render({ value: '01:00' });

    expect(getByText('01:00')).toBeInTheDocument();
  });

  test('assuming the value is not an item in the list it should render the closest item', () => {
    const { getByText } = render({ value: '01:01' });

    expect(getByText('01:00')).toBeInTheDocument();
  });

  describe('step prop', () => {
    it('should render 96 options for time by default', async () => {
      const user = userEvent.setup();
      const { getAllByRole, getByRole } = render();

      await user.click(getByRole('button'));

      expect(getAllByRole('option')).toHaveLength(96);
    });

    it('should handle a different step count being passed', async () => {
      const user = userEvent.setup();
      const { getAllByRole, getByRole } = render({ step: 30 });

      await user.click(getByRole('button'));

      /**
       * 24 hours * (60 minutes / 30 minutes(steps))
       */
      expect(getAllByRole('option')).toHaveLength(24 * (60 / 30));
    });
  });
});
