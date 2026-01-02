import * as React from 'react';

import { render, screen } from '@test/utils';

import { TEXT_VARIANTS } from '../../styles/type';
import { lightTheme } from '../../themes';

import { Typography, TypographyProps } from './Typography';

// Expected base styles for each variant (mobile/base styles, not media queries)
const variantExpectedStyles: Record<
  (typeof TEXT_VARIANTS)[number],
  { fontWeight?: string; fontSize: string; lineHeight: string; textTransform?: string }
> = {
  alpha: {
    fontWeight: String(lightTheme.fontWeights.bold),
    fontSize: lightTheme.fontSizes[6], // 2.8rem
    lineHeight: String(lightTheme.lineHeights[0]), // 1.14
  },
  beta: {
    fontWeight: String(lightTheme.fontWeights.bold),
    fontSize: lightTheme.fontSizes[5], // 2rem
    lineHeight: String(lightTheme.lineHeights[1]), // 1.22
  },
  delta: {
    fontWeight: String(lightTheme.fontWeights.semiBold),
    fontSize: lightTheme.fontSizes[4], // 1.8rem
    lineHeight: String(lightTheme.lineHeights[3]), // 1.33
  },
  epsilon: {
    fontSize: lightTheme.fontSizes[4], // 1.8rem
    lineHeight: String(lightTheme.lineHeights[3]), // 1.33
  },
  omega: {
    fontSize: lightTheme.fontSizes[3], // 1.6rem
    lineHeight: String(lightTheme.lineHeights[6]), // 1.5
  },
  pi: {
    fontSize: lightTheme.fontSizes[1], // 1.2rem
    lineHeight: String(lightTheme.lineHeights[3]), // 1.33
  },
  sigma: {
    fontWeight: String(lightTheme.fontWeights.bold),
    fontSize: lightTheme.fontSizes[0], // 1.1rem
    lineHeight: String(lightTheme.lineHeights[5]), // 1.45
    textTransform: 'uppercase',
  },
};

describe('Typography', () => {
  it('should render a span element by default', () => {
    render(<Typography>Hello World</Typography>);
    expect(screen.getByText('Hello World').tagName).toBe('SPAN');
  });

  it("should render the ellipsis styles when the 'ellipsis' prop is passed", () => {
    render(<Typography ellipsis>Hello World</Typography>);

    expect(screen.getByText('Hello World')).toHaveStyle(`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `);
  });

  describe('Variants', () => {
    TEXT_VARIANTS.forEach((variant) => {
      it(`should render ${variant} variant`, () => {
        const props: TypographyProps = { variant };
        render(<Typography {...props}>Hello World</Typography>);

        const element = screen.getByText('Hello World');
        expect(element).toBeInTheDocument();

        // Test that the styles from the variant are applied correctly
        const expectedStyles = variantExpectedStyles[variant];

        if (expectedStyles.fontWeight) {
          expect(element).toHaveStyle(`font-weight: ${expectedStyles.fontWeight}`);
        }
        expect(element).toHaveStyle(`font-size: ${expectedStyles.fontSize}`);
        expect(element).toHaveStyle(`line-height: ${expectedStyles.lineHeight}`);
        if (expectedStyles.textTransform) {
          expect(element).toHaveStyle(`text-transform: ${expectedStyles.textTransform}`);
        }
      });
    });
  });

  describe('Polymorphic component', () => {
    it("should accept div props that are not explicitly defined in the Box component's prop types", () => {
      const { container } = render(<Typography style={{ color: 'pink' }} />);

      expect(container.firstChild).toHaveStyle('color: pink');
    });

    it('should render and accept attributes when the as prop is `a`', () => {
      // @ts-expect-error – href is not a valid attribute for a div, this error asserts it's not allowed
      const { rerender } = render(<Typography href="https://strapi.io" />);

      rerender(
        <Typography tag="a" href="https://strapi.io">
          Strapi
        </Typography>,
      );
      expect(screen.getByText('Strapi')).toHaveAttribute('href', 'https://strapi.io');
    });

    it('should render and accept props from the component when passed as the `as` prop', () => {
      const MyLink = ({ to, ...props }: { to: string; children?: React.ReactNode }) => <a href={to} {...props} />;

      // @ts-expect-error – to is not a valid attribute for a div, this error asserts it's not allowed
      const { rerender } = render(<Typography to="https://strapi.io" />);

      rerender(
        <Typography tag={MyLink} to="https://strapi.io">
          Strapi
        </Typography>,
      );
      expect(screen.getByText('Strapi')).toHaveAttribute('href', 'https://strapi.io');
    });

    it('should allow me to pass different refs', () => {
      const MyLink = () => {
        const linkRef = React.useRef<HTMLAnchorElement>(null);

        return (
          <Typography tag="a" href="https://strapi.io" ref={linkRef}>
            click me!
          </Typography>
        );
      };

      render(<MyLink />);

      expect(screen.getByRole('link', { name: 'click me!' })).toBeInTheDocument();
    });
  });
});
