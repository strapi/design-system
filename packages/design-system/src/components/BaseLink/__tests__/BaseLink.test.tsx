import { render } from '@test/utils';

import { BaseLink } from '../BaseLink';

describe('BaseLink', () => {
  it('snapshots the component', () => {
    const { container } = render(<BaseLink />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        cursor: pointer;
      }

      <a
        aria-disabled="false"
        class="c0"
        target="_self"
      />
    `);
  });
});
