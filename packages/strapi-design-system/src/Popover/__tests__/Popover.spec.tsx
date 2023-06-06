import { useRef, useState } from 'react';

import { render, waitFor } from '@test/utils';

import { Popover } from '../Popover';

const Component = () => {
  const sourceRef = useRef<HTMLButtonElement>(null!);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button type="button" ref={sourceRef} onClick={() => setIsVisible(true)}>
        Source
      </button>
      {isVisible && (
        <Popover source={sourceRef} onDismiss={() => setIsVisible(false)}>
          <button type="button">Hello world</button>
        </Popover>
      )}
    </div>
  );
};

describe('Popover', () => {
  it('should render the popover when visible is true', async () => {
    const { queryByText, getByRole, user } = render(<Component />, { renderOptions: { container: document.body } });

    expect(queryByText('Hello world')).not.toBeInTheDocument();

    await user.click(getByRole('button', { name: 'Source' }));

    expect(getByRole('button', { name: 'Hello world' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Hello world' })).toHaveFocus();
  });

  it('should close the popover when the escape key is used', async () => {
    const { getByRole, queryByText, user } = render(<Component />, { renderOptions: { container: document.body } });

    await user.click(getByRole('button', { name: 'Source' }));

    expect(queryByText('Hello world')).toBeInTheDocument();

    await user.keyboard('[Escape]');

    await waitFor(() => expect(queryByText('Hello world')).not.toBeInTheDocument());
  });
});
