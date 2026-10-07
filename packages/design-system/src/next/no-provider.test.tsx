import { render, screen } from '@testing-library/react';

import { Alert, AlertDescription, AlertTitle, Checkbox, Spinner, Tag } from './index';

/*
 * The new system needs no provider. Each component here renders a @strapi/icons icon, which used to
 * throw without the styled-components ThemeProvider of the old system
 */
describe('without DesignSystemProvider', () => {
  it('renders the components that show an icon', () => {
    render(
      <>
        <Tag label="Remove French">French</Tag>
        <Checkbox aria-label="Accept" defaultChecked />
        <Spinner />
        <Alert onClose={() => {}} closeLabel="Close">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Description</AlertDescription>
        </Alert>
      </>,
    );

    expect(screen.getByRole('button', { name: 'Remove French' }).querySelector('svg')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Accept' })).toBeChecked();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});
