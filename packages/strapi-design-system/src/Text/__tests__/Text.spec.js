import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { H1, H2, H3, Text, TextButton, Subtitle } from '../';

describe('Text', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <H1>First title</H1>
          <H2>Second title</H2>
          <H3>third title</H3>
          <Text>Text body</Text>
          <Text highlighted={true}>Text body highlighted</Text>
          <Text small={true}>Text body small</Text>
          <Text small={true} highlighted={true}>
            Small button text
          </Text>
          <TextButton>Text button</TextButton>
          <Subtitle>Subtitle</Subtitle>
        </div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        font-weight: 600;
        font-size: 2rem;
        line-height: 1.25;
      }

      .c1 {
        font-weight: 600;
        font-size: 1.125rem;
        line-height: 1.22;
      }

      .c2 {
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.25;
      }

      .c3 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c4 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c5 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c6 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c8 {
        font-size: 1rem;
        line-height: 1.5;
      }

      .c7 {
        font-weight: 600;
        line-height: 1.14;
      }

      <div>
        <h1
          class="c0"
        >
          First title
        </h1>
        <h2
          class="c1"
        >
          Second title
        </h2>
        <h3
          class="c2"
        >
          third title
        </h3>
        <span
          class="c3"
        >
          Text body
        </span>
        <span
          class="c4"
        >
          Text body highlighted
        </span>
        <span
          class="c5"
        >
          Text body small
        </span>
        <span
          class="c6"
        >
          Small button text
        </span>
        <span
          class="c3 c7"
        >
          Text button
        </span>
        <span
          class="c3 c8"
        >
          Subtitle
        </span>
      </div>
    `);
  });
});
