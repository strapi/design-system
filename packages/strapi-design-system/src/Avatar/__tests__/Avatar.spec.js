import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Avatar } from '../Avatar';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Avatar', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Avatar src="https://avatars.githubusercontent.com/u/3874873?v=4" alt="marvin frachet" />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        border-radius: 50%;
        display: block;
        position: relative;
      }

      .c0 {
        position: relative;
        width: 26px;
        height: 26px;
      }

      <span>
        <div
          class="c0"
        >
          <img
            alt="marvin frachet"
            class="c1"
            height="26px"
            src="https://avatars.githubusercontent.com/u/3874873?v=4"
            width="26px"
          />
        </div>
      </span>
    `);
  });

  it('snapshots the component with preview (boolean)', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Avatar src="https://avatars.githubusercontent.com/u/3874873?v=4" alt="marvin frachet" preview />
      </ThemeProvider>,
    );

    fireEvent.mouseEnter(container.querySelector('img'));

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c3 {
        border-radius: 50%;
        display: block;
        position: relative;
      }

      .c1 {
        position: relative;
        width: 26px;
        height: 26px;
      }

      .c0 {
        border-radius: 50%;
        position: absolute;
        -webkit-transform: translate(-19px,-100%);
        -ms-transform: translate(-19px,-100%);
        transform: translate(-19px,-100%);
        margin-top: -4px;
      }

      .c2 {
        z-index: 1;
        border-radius: 50%;
        position: absolute;
        width: 26px;
        height: 26px;
        background: #ffffff;
        opacity: 0.4;
      }

      <span>
        <img
          alt=""
          aria-hidden="true"
          class="c0"
          height="64px"
          src="https://avatars.githubusercontent.com/u/3874873?v=4"
          width="64px"
        />
        <div
          class="c1"
        >
          <div
            class="c2"
          />
          <img
            alt="marvin frachet"
            class="c3"
            height="26px"
            src="https://avatars.githubusercontent.com/u/3874873?v=4"
            width="26px"
          />
        </div>
      </span>
    `);
  });

  it('snapshots the component with preview (string)', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Avatar
          src="https://avatars.githubusercontent.com/u/3874873?v=4"
          alt="marvin frachet"
          preview="https://some-unknown-photo/x.png"
        />
      </ThemeProvider>,
    );

    fireEvent.mouseEnter(container.querySelector('img'));

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c3 {
        border-radius: 50%;
        display: block;
        position: relative;
      }

      .c1 {
        position: relative;
        width: 26px;
        height: 26px;
      }

      .c0 {
        border-radius: 50%;
        position: absolute;
        -webkit-transform: translate(-19px,-100%);
        -ms-transform: translate(-19px,-100%);
        transform: translate(-19px,-100%);
        margin-top: -4px;
      }

      .c2 {
        z-index: 1;
        border-radius: 50%;
        position: absolute;
        width: 26px;
        height: 26px;
        background: #ffffff;
        opacity: 0.4;
      }

      <span>
        <img
          alt=""
          aria-hidden="true"
          class="c0"
          height="64px"
          src="https://some-unknown-photo/x.png"
          width="64px"
        />
        <div
          class="c1"
        >
          <div
            class="c2"
          />
          <img
            alt="marvin frachet"
            class="c3"
            height="26px"
            src="https://avatars.githubusercontent.com/u/3874873?v=4"
            width="26px"
          />
        </div>
      </span>
    `);
  });
});
