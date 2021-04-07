import * as React from 'react';
import { render } from '@testing-library/react';
import { Text } from '../Text';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Text', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <Text variant="header-1" as="h2">
            Header 1
          </Text>
          <Text variant="header-2">Header 2</Text>
          <Text variant="header-3">Header 3</Text>
          <Text variant="subtitle">Subtitle</Text>
          <Text variant="body">Body</Text>
          <Text variant="body-highlight">Body highlight</Text>
          <Text variant="button-text">Button text</Text>
          <Text variant="button-text-s">Button text S</Text>
          <Text variant="text-s">Text S</Text>
          <Text variant="table-label">Table label</Text>
        </div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <h2
          class="sc-bdfBwQ kFBXXw"
        >
          Header 1
        </h2>
        <h2
          class="sc-gsTCUz kIKlxs"
        >
          Header 2
        </h2>
        <h3
          class="sc-dlfnbm idYOgA"
        >
          Header 3
        </h3>
        <p
          class="sc-hKgILt dbLljx"
        >
          Subtitle
        </p>
        <p
          class="sc-eCssSg euVlJS"
        >
          Body
        </p>
        <p
          class="sc-jSgupP dxdYde"
        >
          Body highlight
        </p>
        <p
          class="sc-gKsewC fahbEC"
        >
          Button text
        </p>
        <p
          class="sc-iBPRYJ eyEpFY"
        >
          Button text S
        </p>
        <p
          class="sc-fubCfw hVLfHs"
        >
          Text S
        </p>
        <p
          class="sc-pFZIQ hgofxX"
        >
          Table label
        </p>
      </div>
    `);
  });
});
