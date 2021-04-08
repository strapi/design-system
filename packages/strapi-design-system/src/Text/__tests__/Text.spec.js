import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { H1, H2, H3, TextBody, TextButton, Subtitle } from '../';

describe('Text', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <H1>First title</H1>
          <H2>Second title</H2>
          <H3>third title</H3>
          <TextBody>Text body</TextBody>
          <TextBody highlighted={true}>Text body highlighted</TextBody>
          <TextBody small={true}>Text body small</TextBody>
          <TextBody small={true} highlighted={true}>
            Small button text
          </TextBody>
          <TextButton>Text button</TextButton>
          <Subtitle>Subtitle</Subtitle>
        </div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <h1
          class="sc-bdfBwQ jNNyuU"
        >
          First title
        </h1>
        <h2
          class="sc-gsTCUz bqDpXM"
        >
          Second title
        </h2>
        <h3
          class="sc-dlfnbm cxFMXI"
        >
          third title
        </h3>
        <p
          class="sc-hKgILt jBpBla"
        >
          Text body
        </p>
        <p
          class="sc-hKgILt kRyzsv"
        >
          Text body highlighted
        </p>
        <p
          class="sc-hKgILt lbLfOJ"
        >
          Text body small
        </p>
        <p
          class="sc-hKgILt kmVYZw"
        >
          Small button text
        </p>
        <p
          class="sc-hKgILt sc-jSgupP jBpBla hWQFoj"
        >
          Text button
        </p>
        <p
          class="sc-hKgILt sc-eCssSg jBpBla kuaQhu"
        >
          Subtitle
        </p>
      </div>
    `);
  });
});
