import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
  describe('Locale prop', () => {
    const renderDate = (locale) =>
      render(
        <ThemeProvider theme={lightTheme}>
          <DatePicker
            label="date"
            locale={locale}
            selectedDateLabel={(formattedDate) => `Date picker, current is ${formattedDate}`}
            selectedDate={new Date('Tue Sep 06 2022')}
            onChange={() => null}
          />
        </ThemeProvider>,
      );

    it('should format by EN locale by default', () => {
      renderDate();

      const input = screen.getByRole('textbox');

      expect(input.value).toMatchInlineSnapshot('"9/6/2022"');
    });

    it('should format by the DE locale when passed', () => {
      renderDate('de-DE');

      const input = screen.getByRole('textbox');

      expect(input.value).toMatchInlineSnapshot('"6.9.2022"');
    });
  });
});
