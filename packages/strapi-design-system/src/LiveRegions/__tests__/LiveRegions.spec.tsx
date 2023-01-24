import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { useNotifyAT } from '../useNotifyAT';

describe('LiveRegions', () => {
  beforeAll(() => {
    /**
     * JSDOM does not support innerText but supports innerHTML
     * Faking innerText with innerHTML then...
     * https://github.com/jsdom/jsdom/issues/1245
     */
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
      get() {
        return this.textContent;
      },
      set(next) {
        this.innerHTML = next;
      },
    });
  });

  it('snapshots the component when notifying a log', () => {
    const TestComponent = () => {
      const { notifyLog } = useNotifyAT();

      React.useEffect(() => {
        notifyLog('A log message');
      }, [notifyLog]);

      return null;
    };

    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(container).toMatchInlineSnapshot(`
      .c0 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
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
          class="c0"
        >
          <p
            aria-live="polite"
            aria-relevant="all"
            id="live-region-log"
            role="log"
          >
            A log message
          </p>
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
        </div>
      </div>
    `);
  });

  it('snapshots the component when notifying a status', () => {
    const TestComponent = () => {
      const { notifyStatus } = useNotifyAT();

      React.useEffect(() => {
        notifyStatus('A status message');
      }, [notifyStatus]);

      return null;
    };

    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(container).toMatchInlineSnapshot(`
      .c0 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
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
          >
            A status message
          </p>
          <p
            aria-live="assertive"
            aria-relevant="all"
            id="live-region-alert"
            role="alert"
          />
        </div>
      </div>
    `);
  });

  it('snapshots the component when notifying an alert', () => {
    const TestComponent = () => {
      const { notifyAlert } = useNotifyAT();

      React.useEffect(() => {
        notifyAlert('An alert message');
      }, [notifyAlert]);

      return null;
    };

    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(container).toMatchInlineSnapshot(`
      .c0 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
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
          >
            An alert message
          </p>
        </div>
      </div>
    `);
  });
});
