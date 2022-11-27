import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { DateTimePicker } from '../DateTimePicker';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

const setupComponent = (props) => (
  <ThemeProvider theme={lightTheme}>
    <DateTimePicker {...props} />
  </ThemeProvider>
);

const sharedProps = {
  onChange() {},
  name: 'datetimepicker',
  label: 'Date time picker',
  hint: 'This is a super description',
};

const snapshotProps = {
  value: new Date('2021-10-13T10:00:00.000Z'),
  ...sharedProps,
};

const initializationProps = {
  value: new Date('2021-10-13T15:45:00.000Z'),
  step: 15,
  ...sharedProps,
};

const withNewValueInitialProps = {
  value: new Date('2021-10-13T13:43:00.000Z'),
  step: 15,
  ...sharedProps,
};

const withNewValueFinalProps = {
  value: new Date('2021-10-04T13:00:00.000Z'),
  step: 15,
  ...sharedProps,
};

const withEmptyValuesInitialProps = {
  value: new Date('2021-10-13T15:43:00.000Z'),
  step: 15,
  ...sharedProps,
};

const withEmptyValuesFinalProps = {
  step: 15,
  ...sharedProps,
};

describe('DateTimePicker', () => {
  it('snapshots the component', () => {
    const { container } = render(setupComponent(snapshotProps));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should initialize the two inputs', () => {
    render(setupComponent(initializationProps));

    expect(screen.getByText('15:45')).toBeInTheDocument();
    const datepicker = screen.getByTestId('datetimepicker-date');

    expect(datepicker.value).toBe('10/13/2021');
  });

  it('should rerender a new value passed as props', () => {
    const { rerender } = render(setupComponent(withNewValueInitialProps));

    rerender(setupComponent(withNewValueFinalProps));

    const datepicker = screen.getByTestId('datetimepicker-date');

    expect(datepicker.value).toBe('10/4/2021');
  });

  it('should rerender an empty value if it is passed as props', () => {
    const { rerender } = render(setupComponent(withEmptyValuesInitialProps));

    rerender(setupComponent(withEmptyValuesFinalProps));

    const datepicker = screen.getByTestId('datetimepicker-date');

    expect(datepicker.value).toBe('');
  });
});
