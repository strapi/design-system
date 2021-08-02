import * as React from 'react';
import { render } from '@testing-library/react';
import { Status } from '../Status';
import { Text, P } from '../../Text';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Status', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Status variant="primary">
          <P>
            Hello world <Text highlighted>thing happens</Text>
          </P>
        </Status>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        background: #f0f0ff;
        padding-top: 16px;
        padding-right: 20px;
        padding-bottom: 16px;
        padding-left: 20px;
        border-radius: 4px;
        border: 1px solid #d9d8ff;
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

      .c5 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c6 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c3 {
        margin-right: 12px;
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        background: #4945ff;
      }

      .c1 .c4 {
        color: #4945ff;
      }

      <div
        class="c0 c1"
      >
        <div
          class="c2"
        >
          <div
            class="c3"
          />
          <p
            class="c4 c5"
          >
            Hello world 
            <span
              class="c4 c6"
            >
              thing happens
            </span>
          </p>
        </div>
      </div>
    `);
  });
});
