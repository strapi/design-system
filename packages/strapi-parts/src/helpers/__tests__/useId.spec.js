import React from 'react';
import { render } from '@testing-library/react';
import { useId } from '../useId';

describe('useId', () => {
  it('snapshots with a generated id and a prefix', () => {
    const TestCompo = () => {
      const id = useId('my-prefix', undefined);

      return <div id={id} />;
    };

    const { container } = render(<TestCompo />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          id="my-prefix-1"
        />
      </div>
    `);
  });

  it('snapshots with a predefined ID', () => {
    const TestCompo = () => {
      const id = useId('my-prefix', 'my-custom-id');

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
