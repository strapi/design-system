import React from 'react';

import { render } from '@testing-library/react';

import { useId } from '../useId';

describe('useId', () => {
  it('snapshots with a generated id', () => {
    const TestCompo = () => {
      const id = useId();

      return <div id={id} />;
    };

    const { container } = render(<TestCompo />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          id="0"
        />
      </div>
    `);
  });

  it('snapshots with a predefined ID', () => {
    const TestCompo = () => {
      const id = useId('my-custom-id');

      return <div id={id} />;
    };

    const { container } = render(<TestCompo />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          id="my-custom-id"
        />
      </div>
    `);
  });
});
