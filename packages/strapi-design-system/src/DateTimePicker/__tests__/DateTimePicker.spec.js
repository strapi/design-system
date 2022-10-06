import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { DateTimePicker } from '../DateTimePicker';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('DateTimePicker', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <DateTimePicker
          value={new Date('2021-10-13T10:00:00.000Z')}
          onChange={() => {}}
          name="datetimepicker"
          label="Date time picker"
          hint="This is a super description"
        />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should initialize the two inputs', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <DateTimePicker
          value={new Date('2021-10-13T15:45:00.000Z')}
          step={15}
          onChange={() => {}}
          name="datetimepicker"
          label="Date time picker"
          hint="This is a super description"
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('15:45')).toBeInTheDocument();
    const datepicker = screen.getByTestId('datetimepicker-date');

    expect(datepicker.value).toBe('10/13/2021');
  });

  it('should rerender a new value passed as props', () => {
    const { rerender } = render(
      <ThemeProvider theme={lightTheme}>
        <DateTimePicker
          value={new Date('2021-10-13T13:43:00.000Z')}
          step={15}
          onChange={() => {}}
          name="datetimepicker"
          label="Date time picker"
          hint="This is a super description"
        />
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={lightTheme}>
        <DateTimePicker
          value={new Date('2021-10-04T13:00:00.000Z')}
          step={15}
          onChange={() => {}}
          name="datetimepicker"
          label="Date time picker"
          hint="This is a super description"
        />
      </ThemeProvider>,
    );

    const datepicker = screen.getByTestId('datetimepicker-date');

    expect(datepicker.value).toBe('10/4/2021');
  });

  it('should rerender an empty value if it is passed as props', () => {
    const { rerender } = render(
      <ThemeProvider theme={lightTheme}>
        <DateTimePicker
          value={new Date('2021-10-13T15:43:00.000Z')}
          step={15}
          onChange={() => {}}
          name="datetimepicker"
          label="Date time picker"
          hint="This is a super description"
        />
      </ThemeProvider>,
    );

    rerender(
      <ThemeProvider theme={lightTheme}>
        <DateTimePicker
          step={15}
          onChange={() => {}}
          name="datetimepicker"
          label="Date time picker"
          hint="This is a super description"
        />
      </ThemeProvider>,
    );

    const datepicker = screen.getByTestId('datetimepicker-date');

    expect(datepicker.value).toBe('');
  });
});
