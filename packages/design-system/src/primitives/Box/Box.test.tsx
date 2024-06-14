import * as React from 'react';

import { render, screen } from '@test/utils';
import { styled } from 'styled-components';

import { Box } from './Box';

describe('Box', () => {
  describe('Transient props', () => {
    /**
     * These props should not exist on the underlying DOM element.
     */

    describe('Theme props', () => {
      /**
       * These props access the theme object to get the actual value
       */
      it.each(['color', 'background'])('retrieves the theme value corresponding to the %s props', (colorProp) => {
        const { container } = render(<Box {...{ [colorProp]: 'primary500' }} />);
        expect(container.children[0]).toHaveStyle(`${colorProp}: #7b79ff`);
      });

      it('retrieves the theme value corresponding to the padding', () => {
        const { container } = render(<Box padding={4} />);

        expect(container.children[0]).toHaveStyle(`padding-block: 16px`);
        expect(container.children[0]).toHaveStyle(`padding-inline: 16px`);
      });

      it('retrieves the theme value corresponding to the paddingTop', () => {
        const { container } = render(<Box paddingTop={1} />);
        expect(container.children[0]).toHaveStyle(`padding-block-start: 4px`);
      });

      it('retrieves the theme value corresponding to the paddingBottom', () => {
        const { container } = render(<Box paddingBottom={2} />);
        expect(container.children[0]).toHaveStyle(`padding-block-end: 8px`);
      });

      it('retrieves the theme value corresponding to the paddingLeft', () => {
        const { container } = render(<Box paddingLeft={1} />);
        expect(container.children[0]).toHaveStyle(`padding-inline-start: 4px`);
      });

      it('retrieves the theme value corresponding to the paddingRight', () => {
        const { container } = render(<Box paddingRight={2} />);
        expect(container.children[0]).toHaveStyle(`padding-inline-end: 8px`);
      });

      it('retrieves the theme value corresponding to the margin', () => {
        const { container } = render(<Box margin={4} />);

        expect(container.children[0]).toHaveStyle(`margin-block-start: 16px`);
        expect(container.children[0]).toHaveStyle(`margin-block-end: 16px`);
        expect(container.children[0]).toHaveStyle(`margin-inline-start: 16px`);
        expect(container.children[0]).toHaveStyle(`margin-inline-end: 16px`);
      });

      it('retrieves the theme value corresponding to the marginTop', () => {
        const { container } = render(<Box marginTop={1} />);
        expect(container.children[0]).toHaveStyle(`margin-block-start: 4px`);
      });

      it('retrieves the theme value corresponding to the marginBottom', () => {
        const { container } = render(<Box marginBottom={2} />);
        expect(container.children[0]).toHaveStyle(`margin-block-end: 8px`);
      });

      it('retrieves the theme value corresponding to the marginLeft', () => {
        const { container } = render(<Box marginLeft={1} />);
        expect(container.children[0]).toHaveStyle(`margin-inline-start: 4px`);
      });

      it('retrieves the theme value corresponding to the marginRight', () => {
        const { container } = render(<Box marginRight={2} />);
        expect(container.children[0]).toHaveStyle(`margin-inline-end: 8px`);
      });
    });

    describe('CSS props', () => {
      /**
       * These props are standard CSS properties
       */
      it.each([{ height: '100%' }, { width: '100%' }])('does not render %s prop as HTML attributes', (prop) => {
        const { container } = render(<Box {...prop} />);
        const [key, value] = Object.entries(prop)[0];

        expect(container.children[0]).not.toHaveAttribute(key);
        expect(container.children[0]).toHaveStyle(`${key}: ${value}`);
      });
    });
  });

  describe('Polymorphic component', () => {
    it("should accept div props that are not explicitly defined in the Box component's prop types", () => {
      const { container } = render(<Box style={{ color: 'pink' }} />);

      expect(container.firstChild).toHaveStyle('color: pink');
    });

    it('should render and accept attributes when the as prop is `a`', () => {
      // @ts-expect-error – href is not a valid attribute for a div, this error asserts it's not allowed
      const { container, rerender } = render(<Box href="https://strapi.io" />);

      rerender(<Box tag="a" href="https://strapi.io" />);
      expect(container.firstChild).toHaveAttribute('href', 'https://strapi.io');
    });

    it('should render and accept props from the component when passed as the `as` prop', () => {
      const MyLink = ({ to, ...props }: { to: string; children?: React.ReactNode }) => <a href={to} {...props} />;

      // @ts-expect-error – to is not a valid attribute for a div, this error asserts it's not allowed
      const { container, rerender } = render(<Box to="https://strapi.io" />);

      rerender(<Box tag={MyLink} to="https://strapi.io" />);
      expect(container.firstChild).toHaveAttribute('href', 'https://strapi.io');
    });

    it('should allow me to pass different refs', () => {
      const MyLink = () => {
        const linkRef = React.useRef<HTMLAnchorElement>(null);

        return (
          <Box tag="a" href="https://strapi.io" ref={linkRef}>
            click me!
          </Box>
        );
      };

      render(<MyLink />);

      expect(screen.getByRole('link', { name: 'click me!' })).toBeInTheDocument();
    });

    it('should not let me pass component to the styled version if the prop does not exist', () => {
      const MyBox = styled<typeof Box<'div'>>(Box)``;

      // @ts-expect-error – to is not a valid attribute for a div, this error asserts it's not allowed
      render(<MyBox fake="yes" />);
    });
  });
});
