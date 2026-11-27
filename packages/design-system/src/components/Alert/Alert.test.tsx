import { render } from '@test/utils';

import { Alert } from './Alert';

describe('Alert', () => {
  it('should render a close button that calls onClose when onClose is passed', async () => {
    const onClose = jest.fn();

    const { getByRole, user } = render(
      <Alert title="Title" closeLabel="Close alert" onClose={onClose}>
        Body
      </Alert>,
    );

    await user.click(getByRole('button', { name: 'Close alert' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should label the close button "Close" when closeLabel is not passed', () => {
    const { getByRole } = render(
      <Alert title="Title" onClose={jest.fn()}>
        Body
      </Alert>,
    );

    expect(getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should not render a close button when onClose is not passed', () => {
    const { getByText, queryByRole } = render(
      <Alert title="Title" closeLabel="Close alert">
        Body
      </Alert>,
    );

    expect(getByText('Body')).toBeInTheDocument();
    expect(queryByRole('button')).not.toBeInTheDocument();
  });
});
