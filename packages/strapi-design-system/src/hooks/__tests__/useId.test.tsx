import { render } from '@test/utils';

import { useId } from '../useId';

describe('useId', () => {
  it('snapshots with a generated id', () => {
    const TestCompo = () => {
      const id = useId();

      return <div id={id} />;
    };

    const { container } = render(<TestCompo />);
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      <div>
        <div
          id=":r0:"
        />
        <span
          class="c0"
        >
          <p
            aria-live="polite"
            aria-relevant="all"
            id="live-region-log"
            role="log"
          />
          <p
            aria-live="polite"
            aria-relevant="all"
            id="live-region-status"
            role="status"
          />
          <p
            aria-live="assertive"
            aria-relevant="all"
            id="live-region-alert"
            role="alert"
          />
        </span>
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
      .c0 {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      <div>
        <div
          id="my-custom-id"
        />
        <span
          class="c0"
        >
          <p
            aria-live="polite"
            aria-relevant="all"
            id="live-region-log"
            role="log"
          />
          <p
            aria-live="polite"
            aria-relevant="all"
            id="live-region-status"
            role="status"
          />
          <p
            aria-live="assertive"
            aria-relevant="all"
            id="live-region-alert"
            role="alert"
          />
        </span>
      </div>
    `);
  });
});
