import * as React from 'react';

import { render as renderRTL, RenderOptions as RTLRenderOptions, RenderResult } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { DesignSystemProvider } from '../src/DesignSystemProvider';

interface RenderOptions {
  renderOptions?: RTLRenderOptions;
  userEventOptions?: Parameters<typeof userEvent.setup>[0];
}

type RenderRTLResult = RenderResult & {
  user: ReturnType<typeof userEvent.setup>;
};

// eslint-disable-next-line react/jsx-no-useless-fragment
const fallbackWrapper = ({ children }) => <>{children}</>;

export const render = (
  ui: React.ReactElement,
  { renderOptions, userEventOptions }: RenderOptions = {},
): RenderRTLResult => {
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

export type { RenderOptions, RenderRTLResult, RenderResult };

export { within, type RenderHookOptions, renderHook, screen, fireEvent, waitFor } from '@testing-library/react';
