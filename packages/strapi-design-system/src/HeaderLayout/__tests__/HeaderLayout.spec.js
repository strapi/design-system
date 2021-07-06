import * as React from 'react';
import { render } from '@testing-library/react';
import { HeaderLayout } from '../HeaderLayout';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('HeaderLayout', () => {
  it('snapshots the component when not sticky', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <HeaderLayout
          navigationAction={<a href="/">Go back</a>}
          primaryAction={<button>primary aciton</button>}
          secondaryAction={<button>secondary action</button>}
          title={<h2>CT</h2>}
          subtitle={<p>36 entries found</p>}
        />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        padding-top: 24px;
        padding-right: 56px;
        padding-bottom: 56px;
        padding-left: 56px;
      }

      .c1 {
        padding-bottom: 12px;
      }

      .c4 {
        padding-left: 16px;
      }

      .c5 {
        padding-top: 4px;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c3 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      <div
        class="c0"
      >
        <div
          class="c1"
        >
          <a
            href="/"
          >
            Go back
          </a>
        </div>
        <div
          class="c2"
        >
          <div
            class="c3"
          >
            <h2>
              CT
            </h2>
            <div
              class="c4"
            >
              <button>
                secondary action
              </button>
            </div>
          </div>
          <button>
            primary aciton
          </button>
        </div>
        <div
          class="c5"
        >
          <p>
            36 entries found
          </p>
        </div>
      </div>
    `);
  });

  it('snapshots the component when sticky', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <HeaderLayout
          navigationAction={<a href="/">Go back</a>}
          primaryAction={<button>primary aciton</button>}
          secondaryAction={<button>secondary action</button>}
          title={<h2>CT</h2>}
          subtitle={<p>36 entries found</p>}
          sticky
        />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        padding-top: 12px;
        padding-right: 24px;
        padding-bottom: 12px;
        padding-left: 24px;
      }

      .c3 {
        padding-right: 12px;
      }

      .c4 {
        padding-left: 8px;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      <div
        class="c0"
      >
        <div
          class="c1"
        >
          <div
            class="c2"
          >
            <div
              class="c3"
            >
              <a
                href="/"
              >
                Go back
              </a>
            </div>
            <div
              class=""
            >
              <h2>
                CT
              </h2>
              <p>
                36 entries found
              </p>
            </div>
          </div>
          <div
            class="c2"
          >
            <button>
              secondary action
            </button>
            <div
              class="c4"
            >
              <button>
                primary aciton
              </button>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
