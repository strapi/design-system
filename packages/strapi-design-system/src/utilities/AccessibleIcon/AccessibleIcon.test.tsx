import { Cross } from '@strapi/icons';

import { AccessibleIcon } from './AccessibleIcon';
import { screen, render } from '../../../test/utils';

const LABEL_TEXT = 'Close';

describe('AccessibleIcon', () => {
  it('should have a label', () => {
    render(
      <AccessibleIcon label={LABEL_TEXT}>
        <Cross data-testid="icon" />
      </AccessibleIcon>,
    );

    expect(screen.getByText(LABEL_TEXT)).toBeInTheDocument();
  });

  it('should add an aria-hidden attribute to the child', () => {
    render(
      <AccessibleIcon label={LABEL_TEXT}>
        <Cross data-testid="icon" />
      </AccessibleIcon>,
    );

    const svg = screen.getByTestId('icon');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('should set focusable attribute on the child to false', () => {
    render(
      <AccessibleIcon label={LABEL_TEXT}>
        <Cross data-testid="icon" />
      </AccessibleIcon>,
    );

    const svg = screen.getByTestId('icon');
    expect(svg.getAttribute('focusable')).toBe('false');
  });

  it('should error without children', () => {
    // Even though the error is caught, it still gets printed to the console
    // so we mock that out to avoid the wall of red text.
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    expect(() => render(<AccessibleIcon label={LABEL_TEXT} />)).toThrowErrorMatchingInlineSnapshot(
      `"React.Children.only expected to receive a single React element child."`,
    );

    spy.mockRestore();
  });
});
