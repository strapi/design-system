import * as React from 'react';

import { render, screen } from '@test/utils';

import { Typography, TypographyProps } from './Typography';
import { TEXT_VARIANTS, variant as variantStyle } from '../styles/type';
import { lightTheme } from '../themes';

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

        expect(screen.getByText('Hello World')).toHaveStyle(`
          ${variantStyle({ $variant: variant, theme: lightTheme })}
        `);
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
      // eslint-disable-next-line jsx-a11y/anchor-has-content
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
