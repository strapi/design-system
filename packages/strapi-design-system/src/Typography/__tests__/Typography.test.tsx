import { render } from '@test/utils';

import { Typography, TypographyProps } from '../Typography';

const setup = (props: TypographyProps) => render(<Typography {...props} />);

describe('Typography', () => {
  test('textAlign', async () => {
    const { container } = setup({
      children: 'Test',
      textAlign: 'center',
    });

    expect(container).toMatchSnapshot();
  });

  test('textTransform', () => {
    const { container } = setup({
      children: 'Test',
      textTransform: 'uppercase',
    });

    expect(container).toMatchSnapshot();
  });
});
