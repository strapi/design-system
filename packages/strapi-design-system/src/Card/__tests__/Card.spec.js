import * as React from 'react';
import { render } from '@testing-library/react';
import { Card } from '../Card';
import { CardHeader } from '../CardHeader';
import { CardCheckbox } from '../CardCheckbox';
import { CardAction } from '../CardAction';
import { CardAsset } from '../CardAsset';
import { CardTimer } from '../CardTimer';
import { CardBody } from '../CardBody';
import { CardContent } from '../CardContent';
import { CardTitle, CardSubtitle } from '../CardTitle';
import { CardBadge } from '../CardBadge';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Card', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Card style={{ width: '240px' }} id="1">
          <CardHeader>
            <CardCheckbox value={true} />
            <CardAction position="end">
              <span>Hello world</span>
            </CardAction>
            <CardAsset src={'./somewhere-it-belongs'} />
            <CardTimer>05:39</CardTimer>
          </CardHeader>
          <CardBody>
            <CardContent>
              <CardTitle>File name</CardTitle>
              <CardSubtitle>PNG - 400x400</CardSubtitle>
            </CardContent>
            <CardBadge>Doc</CardBadge>
          </CardBody>
        </Card>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
      }

      .c7 {
        background: #212134;
        color: #ffffff;
        padding: 4px;
        border-radius: 4px;
      }

      .c10 {
        padding-top: 8px;
        padding-right: 12px;
        padding-bottom: 8px;
        padding-left: 12px;
      }

      .c14 {
        background: #f6f6f9;
        color: #666687;
        padding: 4px;
        border-radius: 4px;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c11 {
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

      .c2 {
        position: relative;
        border-bottom: 1px solid #eaeaef;
        height: 5.5rem;
      }

      .c3 {
        position: absolute;
        top: 12px;
        left: 12px;
      }

      .c5 {
        position: absolute;
        top: 12px;
        right: 12px;
      }

      .c4 {
        height: 18px;
        width: 18px;
        border-radius: 4px;
        border: 1px solid #c0c0cf;
        -webkit-appearance: none;
        background-color: #ffffff;
      }

      .c4:checked {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c4:checked:after {
        content: '';
        display: block;
        position: relative;
        background: url(test-file-stub) no-repeat no-repeat center center;
        width: 10px;
        height: 10px;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c4:checked:disabled:after {
        background: url(test-file-stub) no-repeat no-repeat center center;
      }

      .c4:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c4:indeterminate {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c4:indeterminate:after {
        content: '';
        display: block;
        position: relative;
        color: white;
        height: 2px;
        width: 10px;
        background-color: #ffffff;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c4:indeterminate:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c4:indeterminate:disabled:after {
        background-color: #8e8ea9;
      }

      .c6 {
        display: block;
        margin: 0;
        padding: 0;
        height: 100%;
      }

      .c9 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c12 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c13 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c17 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c18 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c19 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c8 {
        position: absolute;
        bottom: 4px;
        right: 4px;
      }

      .c15 {
        display: inline-block;
      }

      .c16 {
        margin-left: auto;
      }

      <article
        aria-labelledby="card-title-1"
        class="c0"
        style="width: 240px;"
        tabindex="0"
      >
        <div
          class="c1 c2"
        >
          <div
            class="c3"
          >
            <input
              aria-labelledby="card-title-1"
              checked=""
              class="c4"
              type="checkbox"
            />
          </div>
          <div
            class="c5"
          >
            <span>
              Hello world
            </span>
          </div>
          <img
            aria-hidden="true"
            class="c6"
            src="./somewhere-it-belongs"
          />
          <time
            class="c7 c8"
          >
            <p
              class="c9"
            >
              05:39
            </p>
          </time>
        </div>
        <div
          class="c10"
        >
          <div
            class="c11"
          >
            <div
              class=""
            >
              <div
                class="c12"
                id="card-title-1"
              >
                File name
              </div>
              <div
                class="c13"
              >
                PNG - 400x400
              </div>
            </div>
            <div
              class="c14 c15 c16"
            >
              <p
                class="c17 c18 c19"
              >
                Doc
              </p>
            </div>
          </div>
        </div>
      </article>
    `);
  });
});
