import * as React from 'react';
import { render } from '@testing-library/react';
import { Radio, RadioGroup } from '../';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('uuid', () => ({ v4: () => 1 }));

describe('Radio', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <RadioGroup labelledBy="trophy-champions" onSelect={() => null} value={'pizza'} name="1">
          <Radio value="pizza">Pizza</Radio>
        </RadioGroup>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        aria-labelledby="trophy-champions"
        role="radiogroup"
      >
        <label
          class="sc-eCssSg sc-pFZIQ bCaUrK frprlu"
        >
          <input
            aria-checked="true"
            class="sc-bdfBwQ buUKqr"
            name="1"
            tabindex="0"
            type="radio"
            value="pizza"
          />
          <div
            class="sc-fubCfw lkaSCX"
          >
            Pizza
          </div>
        </label>
      </div>
    `);
  });
});
