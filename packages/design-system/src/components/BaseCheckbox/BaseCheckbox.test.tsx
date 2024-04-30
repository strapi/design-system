import { screen, render } from '@test/utils';

import { BaseCheckbox } from './BaseCheckbox';

describe('BaseCheckbox', () => {
  it('should render a checkbox element and use the aria-label', () => {
    render(<BaseCheckbox aria-label="test" />);
    expect(screen.getByLabelText('test')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'test' })).toBeInTheDocument();
  });
});
