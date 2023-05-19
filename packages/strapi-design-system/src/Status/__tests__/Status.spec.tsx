import * as React from 'react';

import { render, waitFor } from '@testing-library/react';

import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { Status } from '../Status';

describe('Status', () => {
  it('it displays its children', async () => {
    const { getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Status>My status</Status>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(getByText('My status')).toBeInTheDocument();
    });
  });

  it('it displays a preceeding bullet by default', async () => {
    const { queryByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Status>My status</Status>
      </ThemeProvider>,
    );

    const textNode = queryByText('My status');

    await waitFor(() => {
      // @ts-expect-error TODO: refactor these tests
      expect(textNode.querySelector('div')).toBeInTheDocument();
    });
  });

  it('it is possible to disable the preceeding bullet', async () => {
    const { queryByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Status showBullet={false}>My status</Status>
      </ThemeProvider>,
    );

    const textNode = queryByText('My status');

    await waitFor(() => {
      // @ts-expect-error TODO: refactor these tests
      expect(textNode.innerHTML).toBe('My status');
    });
  });
});
