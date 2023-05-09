import { render } from '@test/utils';

import { Box } from '../Box';

const setup = (props = {}) => render(<Box {...props} />);

describe('Box', () => {
  it.each(['color', 'background'])('retrieves the theme value corresponding to the %s props', (colorProp) => {
    const { container } = setup({ [colorProp]: 'primary500' });
    expect(container.children[0]).toHaveStyle(`${colorProp}: #7b79ff`);
  });

  it.each(['padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'])(
    'retrieves the theme value corresponding to the %s props',
    (spacingProp) => {
      const { container } = setup({ [spacingProp]: 4 });
      expect(container.children[0]).toHaveStyle(`${spacingProp}: 16px`);
    },
  );

  it.each(['color', 'cursor', 'height', 'width'])(
    'does not render color or cursor props as HTML attributes',
    (prop) => {
      const { container } = setup({ [prop]: 'something' });
      expect(container.children[0]).not.toHaveAttribute(prop);
    },
  );
});
