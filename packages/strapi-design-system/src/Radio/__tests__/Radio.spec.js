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
      <div
        aria-labelledby="trophy-champions"
        role="radiogroup"
      >
        <label
          class="sc-eCImvq sc-pVTma fXjSrz cClVsq"
        >
          <input
            aria-checked="true"
            class="sc-bdvvaa iWMear"
            name="1"
            tabindex="0"
            type="radio"
            value="pizza"
          />
          <div
            class="sc-furvIG jpwnkH"
          >
            Pizza
          </div>
        </label>
      </div>
    `);
  });
});
