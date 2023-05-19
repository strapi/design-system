import * as React from 'react';

import { render as renderRTL, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { Popover } from '../Popover';

const Component = () => {
  const sourceRef = React.useRef<HTMLButtonElement>(null!);
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <ThemeProvider theme={lightTheme}>
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
    </ThemeProvider>
  );
};

const render = () => ({
  ...renderRTL(<Component />, { container: document.body }),
  user: userEvent.setup(),
});

describe('Popover', () => {
  it('should render the popover when visible is true', async () => {
    const { queryByText, getByRole, user } = render();

    expect(queryByText('Hello world')).not.toBeInTheDocument();

    await user.click(getByRole('button', { name: 'Source' }));

    expect(getByRole('button', { name: 'Hello world' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Hello world' })).toHaveFocus();
  });

  it('should close the popover when the escape key is used', async () => {
    const { getByRole, queryByText, user } = render();

    await user.click(getByRole('button', { name: 'Source' }));

    expect(queryByText('Hello world')).toBeInTheDocument();

    await user.keyboard('[Escape]');

    await waitFor(() => expect(queryByText('Hello world')).not.toBeInTheDocument());
  });
});
