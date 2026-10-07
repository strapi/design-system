import * as React from 'react';

import { render, screen } from '@test/utils';

import { Main, SkipToContent } from './main';

describe('Main', () => {
  it('renders the main landmark, named by the page title', () => {
    render(
      <Main>
        <h1 id="main-content-title">Content Manager</h1>
      </Main>,
    );

    const main = screen.getByRole('main', { name: 'Content Manager' });

    expect(main).toHaveAttribute('id', 'main-content');
    expect(main).toHaveAttribute('tabindex', '-1');
  });

  it('takes another labelling element', () => {
    render(
      <Main labelledBy="title">
        <h1 id="title">Settings</h1>
      </Main>,
    );

    expect(screen.getByRole('main', { name: 'Settings' })).toBeInTheDocument();
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLElement>();

    render(<Main ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('main'));
  });
});

describe('SkipToContent', () => {
  it('links to the main content', () => {
    render(<SkipToContent>Skip to content</SkipToContent>);

    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content');
  });
});
