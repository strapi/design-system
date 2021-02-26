import * as React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('uuid', () => ({ v4: () => 1 }));

describe('Radio', () => {
  it('snapshots when the value is undefined (first element should have tabindex=0)', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <label id="trophy-champions">Trophy champion</label>

          <RadioGroup labelledBy="trophy-champions" onSelect={() => undefined} value={undefined}>
            <label htmlFor="first">Mario</label>
            <Radio value="first" id="first" />

            <label htmlFor="second">Luigi</label>
            <Radio value="second" id="second" />

            <label htmlFor="third">Wario</label>
            <Radio value="third" id="third" />
          </RadioGroup>
        </div>
      </ThemeProvider>,
    );

    await waitFor(() => expect(screen.getByLabelText('Mario').getAttribute('tabindex')).toBe('0'));

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <label
          id="trophy-champions"
        >
          Trophy champion
        </label>
        <div
          aria-labelledby="trophy-champions"
          role="radiogroup"
        >
          <label
            for="first"
          >
            Mario
          </label>
          <input
            aria-checked="false"
            class="sc-bdfBwQ DFzle"
            id="first"
            name="1"
            tabindex="0"
            type="radio"
            value="first"
          />
          <label
            for="second"
          >
            Luigi
          </label>
          <input
            aria-checked="false"
            class="sc-bdfBwQ DFzle"
            id="second"
            name="1"
            tabindex="-1"
            type="radio"
            value="second"
          />
          <label
            for="third"
          >
            Wario
          </label>
          <input
            aria-checked="false"
            class="sc-bdfBwQ DFzle"
            id="third"
            name="1"
            tabindex="-1"
            type="radio"
            value="third"
          />
        </div>
      </div>
    `);
  });

  it('snapshots when the value is second (first element should have tabindex=-1)', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <label id="trophy-champions">Trophy champion</label>

          <RadioGroup labelledBy="trophy-champions" onSelect={() => undefined} value={'second'}>
            <label htmlFor="first">Mario</label>
            <Radio value="first" id="first" />

            <label htmlFor="second">Luigi</label>
            <Radio value="second" id="second" />

            <label htmlFor="third">Wario</label>
            <Radio value="third" id="third" />
          </RadioGroup>
        </div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <label
          id="trophy-champions"
        >
          Trophy champion
        </label>
        <div
          aria-labelledby="trophy-champions"
          role="radiogroup"
        >
          <label
            for="first"
          >
            Mario
          </label>
          <input
            aria-checked="false"
            class="sc-bdfBwQ DFzle"
            id="first"
            name="1"
            tabindex="-1"
            type="radio"
            value="first"
          />
          <label
            for="second"
          >
            Luigi
          </label>
          <input
            aria-checked="true"
            class="sc-bdfBwQ DFzle"
            id="second"
            name="1"
            tabindex="0"
            type="radio"
            value="second"
          />
          <label
            for="third"
          >
            Wario
          </label>
          <input
            aria-checked="false"
            class="sc-bdfBwQ DFzle"
            id="third"
            name="1"
            tabindex="-1"
            type="radio"
            value="third"
          />
        </div>
      </div>
    `);
  });
});
