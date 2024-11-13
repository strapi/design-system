import { render } from '@test/utils';

import { Status } from './Status';

describe('Status', () => {
  it('displays its children', () => {
    const { getByText } = render(<Status>My status</Status>);

    expect(getByText('My status')).toBeInTheDocument();
  });
});
