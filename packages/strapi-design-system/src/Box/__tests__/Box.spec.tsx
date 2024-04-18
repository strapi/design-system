import { render } from '@test/utils';

import { Box } from '../Box';

const setup = (props = {}) => render(<Box {...props} />);

describe('Box', () => {
  it.each(['color', 'background'])('retrieves the theme value corresponding to the %s props', (colorProp) => {
    const { container } = setup({ [colorProp]: 'primary500' });
    expect(container.children[0]).toHaveStyle(`${colorProp}: #7b79ff`);
  });

  it('retrieves the theme value corresponding to the padding', () => {
    const { container } = setup({ padding: 4 });
    expect(container.children[0]).toHaveStyle(`padding-block: 16px`);
    expect(container.children[0]).toHaveStyle(`padding-inline: 16px`);
  });

  it('retrieves the theme value corresponding to the paddingTop', () => {
    const { container } = setup({ paddingTop: 1 });
    expect(container.children[0]).toHaveStyle(`padding-block-start: 4px`);
  });

  it('retrieves the theme value corresponding to the paddingBottom', () => {
    const { container } = setup({ paddingBottom: 2 });
    expect(container.children[0]).toHaveStyle(`padding-block-end: 8px`);
  });

  it('retrieves the theme value corresponding to the paddingLeft', () => {
    const { container } = setup({ paddingLeft: 1 });
    expect(container.children[0]).toHaveStyle(`padding-inline-start: 4px`);
  });

  it('retrieves the theme value corresponding to the paddingRight', () => {
    const { container } = setup({ paddingRight: 2 });
    expect(container.children[0]).toHaveStyle(`padding-inline-end: 8px`);
  });

  it('retrieves the theme value corresponding to the margin', () => {
    const { container } = setup({ margin: 4 });
    expect(container.children[0]).toHaveStyle(`margin-block: 16px`);
    expect(container.children[0]).toHaveStyle(`margin-inline: 16px`);
  });

  it('retrieves the theme value corresponding to the marginTop', () => {
    const { container } = setup({ marginTop: 1 });
    expect(container.children[0]).toHaveStyle(`margin-block-start: 4px`);
  });

  it('retrieves the theme value corresponding to the marginBottom', () => {
    const { container } = setup({ marginBottom: 2 });
    expect(container.children[0]).toHaveStyle(`margin-block-end: 8px`);
  });

  it('retrieves the theme value corresponding to the marginLeft', () => {
    const { container } = setup({ marginLeft: 1 });
    expect(container.children[0]).toHaveStyle(`margin-inline-start: 4px`);
  });

  it('retrieves the theme value corresponding to the marginRight', () => {
    const { container } = setup({ marginRight: 2 });
    expect(container.children[0]).toHaveStyle(`margin-inline-end: 8px`);
  });

  it.each(['color', 'cursor', 'height', 'width'])(
    'does not render color or cursor props as HTML attributes',
    (prop) => {
      const { container } = setup({ [prop]: 'something' });
      expect(container.children[0]).not.toHaveAttribute(prop);
    },
  );
});
