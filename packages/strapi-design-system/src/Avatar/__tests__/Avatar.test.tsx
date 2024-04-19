import { render, fireEvent } from '@test/utils';

import { Avatar } from '../Avatar';

describe('Avatar', () => {
  it('snapshots the component with preview (boolean)', () => {
    const { container } = render(
      <Avatar src="https://avatars.githubusercontent.com/u/3874873?v=4" alt="marvin frachet" preview />,
    );

    fireEvent.mouseEnter(container.querySelector('img')!);

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        position: relative;
        z-index: 1;
        width: 32px;
        height: 32px;
      }

      .c2 {
        background: #ffffff;
        border-radius: 50%;
        position: absolute;
        z-index: 1;
        width: 32px;
        height: 32px;
      }

      .c4 {
        border-radius: 50%;
        object-fit: cover;
        display: block;
        position: relative;
      }

      .c0 {
        border-radius: 50%;
        object-fit: cover;
        position: absolute;
        -webkit-transform: translate(-16px,-100%);
        -ms-transform: translate(-16px,-100%);
        transform: translate(-16px,-100%);
        margin-top: -4px;
      }

      .c3 {
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
            class="c2 c3"
          />
          <img
            alt="marvin frachet"
            class="c4"
            height="32px"
            src="https://avatars.githubusercontent.com/u/3874873?v=4"
            width="32px"
          />
        </div>
      </span>
    `);
  });

  it('snapshots the component with preview (string)', () => {
    const { container } = render(
      <Avatar
        src="https://avatars.githubusercontent.com/u/3874873?v=4"
        alt="marvin frachet"
        preview="https://some-unknown-photo/x.png"
      />,
    );

    fireEvent.mouseEnter(container.querySelector('img')!);

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        position: relative;
        z-index: 1;
        width: 32px;
        height: 32px;
      }

      .c2 {
        background: #ffffff;
        border-radius: 50%;
        position: absolute;
        z-index: 1;
        width: 32px;
        height: 32px;
      }

      .c4 {
        border-radius: 50%;
        object-fit: cover;
        display: block;
        position: relative;
      }

      .c0 {
        border-radius: 50%;
        object-fit: cover;
        position: absolute;
        -webkit-transform: translate(-16px,-100%);
        -ms-transform: translate(-16px,-100%);
        transform: translate(-16px,-100%);
        margin-top: -4px;
      }

      .c3 {
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
            class="c2 c3"
          />
          <img
            alt="marvin frachet"
            class="c4"
            height="32px"
            src="https://avatars.githubusercontent.com/u/3874873?v=4"
            width="32px"
          />
        </div>
      </span>
    `);
  });
});
