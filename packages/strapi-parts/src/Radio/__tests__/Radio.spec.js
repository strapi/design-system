import * as React from 'react';
import { render } from '@testing-library/react';
import { Radio, RadioGroup } from '../';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Radio', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <RadioGroup labelledBy="trophy-champions" onChange={() => null} value={'pizza'} name="1">
          <Radio value="pizza">Pizza</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        border: 1px solid #4945ff;
        border-radius: 50%;
        height: 18px;
        width: 18px;
        -webkit-appearance: none;
      }

      .c2:after {
        border-radius: 50%;
        content: '';
        position: relative;
        z-index: 1;
        display: block;
        height: 10px;
        width: 10px;
        left: 3px;
        top: 3px;
      }

      .c2:checked:after {
        background: #4945ff;
      }

      .c2:disabled {
        border: 1px solid;
        background: #dcdce4;
      }

      .c0 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c3 {
        padding-left: 8px;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      <div
        aria-labelledby="trophy-champions"
        role="radiogroup"
      >
        <label
          class="c0 c1"
        >
          <input
            aria-checked="true"
            class="c2"
            name="1"
            tabindex="0"
            type="radio"
            value="pizza"
          />
          <div
            class="c3"
          >
            Pizza
          </div>
        </label>
      </div>
    `);
  });
});
