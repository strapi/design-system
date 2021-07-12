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
          title="CT"
          subtitle="36 entries found"
        />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c4 {
        font-weight: 600;
        font-size: 2rem;
        line-height: 1.25;
      }

      .c6 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #666687;
      }

      .c7 {
        font-size: 1rem;
        line-height: 1.5;
      }

      .c0 {
        padding-top: 24px;
        padding-right: 56px;
        padding-bottom: 56px;
        padding-left: 56px;
      }

      .c1 {
        padding-bottom: 12px;
      }

      .c5 {
        padding-left: 16px;
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
            <h1
              class="c4"
            >
              CT
            </h1>
            <div
              class="c5"
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
        <p
          class="c6 c7"
        >
          36 entries found
        </p>
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
          title={'CT'}
          subtitle={'36 entries found'}
          sticky
        />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c4 {
        font-weight: 600;
        font-size: 1.125rem;
        line-height: 1.22;
      }

      .c5 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c0 {
        padding-top: 12px;
        padding-right: 24px;
        padding-bottom: 12px;
        padding-left: 24px;
      }

      .c3 {
        padding-right: 12px;
      }

      .c6 {
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
              <h1
                class="c4"
              >
                CT
              </h1>
              <p
                class="c5"
              >
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
              class="c6"
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
