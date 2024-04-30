import * as React from 'react';

import { render, waitFor } from '@test/utils';

import { Status } from '../Status';

describe('Status', () => {
  it('it displays its children', async () => {
    const { getByText } = render(<Status>My status</Status>);

    await waitFor(() => {
      expect(getByText('My status')).toBeInTheDocument();
    });
  });

  it('it displays a preceeding bullet by default', async () => {
    const { queryByText } = render(<Status>My status</Status>);

    const textNode = queryByText('My status');

    await waitFor(() => {
      // @ts-expect-error TODO: refactor these tests
      expect(textNode.querySelector('div')).toBeInTheDocument();
    });
  });

  it('it is possible to disable the preceeding bullet', async () => {
    const { queryByText } = render(<Status showBullet={false}>My status</Status>);

    const textNode = queryByText('My status');

    await waitFor(() => {
      // @ts-expect-error TODO: refactor these tests
      expect(textNode.innerHTML).toBe('My status');
    });
  });
});
