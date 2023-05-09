import * as React from 'react';

import { render as renderRTL, RenderOptions as RTLRenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DesignSystemProvider } from '../src/DesignSystemProvider';

interface RenderOptions {
  renderOptions?: RTLRenderOptions;
  userEventOptions?: Parameters<typeof userEvent.setup>[0];
}

// eslint-disable-next-line react/jsx-no-useless-fragment
const fallbackWrapper = ({ children }) => <>{children}</>;

const render = (ui: React.ReactElement, { renderOptions, userEventOptions }: RenderOptions = {}) => {
  const { wrapper: Wrapper = fallbackWrapper, ...restOptions } = renderOptions ?? {};

  return {
    ...renderRTL(ui, {
      wrapper: ({ children }) => (
        <DesignSystemProvider locale="en-GB">
          <Wrapper>{children}</Wrapper>
        </DesignSystemProvider>
      ),
      ...restOptions,
    }),
    user: userEvent.setup(userEventOptions),
  };
};

export * from '@testing-library/react';
export { render };
