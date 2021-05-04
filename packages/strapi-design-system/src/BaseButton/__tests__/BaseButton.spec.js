import * as React from 'react';
import { render } from '@testing-library/react';
import { BaseButton } from '../BaseButton';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('BaseButton', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <BaseButton />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(``);
  });
});
