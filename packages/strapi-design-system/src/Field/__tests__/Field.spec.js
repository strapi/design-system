import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { FieldLabel } from '../FieldLabel';
import { FieldHint } from '../FieldHint';
import { FieldError } from '../FieldError';
import { FieldInput } from '../FieldInput';
import { Field } from '../Field';

jest.mock('uuid', () => ({
  v4: () => 1,
}));

describe('Field', () => {
  it('snapshots the default example', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Field name="email">
          <FieldLabel>Email</FieldLabel>
          <FieldInput type="text" placeholder="Placeholder" value={'Hello world'} onChange={() => undefined} />
        </Field>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <label
          class="sc-hKgILt fopLzU"
          for="field-1"
        >
          Email
        </label>
        <div
          class="sc-iBPRYJ ipEIjR"
        >
          <input
            aria-invalid="false"
            class="sc-fubCfw bUaIIY"
            id="field-1"
            name="email"
            placeholder="Placeholder"
            type="text"
            value="Hello world"
          />
        </div>
      </div>
    `);
  });

  it('snapshots the "with description" example', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Field name="email" hint="Description line">
          <FieldLabel>Email</FieldLabel>
          <FieldInput type="text" placeholder="Placeholder" value={'email'} onChange={() => undefined} />
          <FieldHint />
        </Field>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <label
          class="sc-hKgILt fopLzU"
          for="field-1"
        >
          Email
        </label>
        <div
          class="sc-iBPRYJ ipEIjR"
        >
          <input
            aria-describedby="field-hint-1"
            aria-invalid="false"
            class="sc-fubCfw bUaIIY"
            id="field-1"
            name="email"
            placeholder="Placeholder"
            type="text"
            value="email"
          />
        </div>
        <p
          class="sc-hKgILt clHUCC"
          id="field-hint-1"
        >
          Description line
        </p>
      </div>
    `);
  });

  it('snapshots the "with error" example', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Field name="email" hint="Description line" error="Too long email">
          <FieldLabel>Email</FieldLabel>
          <FieldInput type="text" placeholder="Placeholder" value={'too long email'} onChange={() => undefined} />
          <FieldHint />
          <FieldError />
        </Field>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <label
          class="sc-hKgILt fopLzU"
          for="field-1"
        >
          Email
        </label>
        <div
          class="sc-iBPRYJ ipEIjR"
        >
          <input
            aria-describedby="field-error-1"
            aria-invalid="true"
            class="sc-fubCfw VYVPw"
            id="field-1"
            name="email"
            placeholder="Placeholder"
            type="text"
            value="too long email"
          />
        </div>
        <p
          class="sc-hKgILt dffNMk"
          id="field-error-1"
        >
          Too long email
        </p>
      </div>
    `);
  });

  it('snapshots the "disabled" example', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Field name="password" hint="Description line">
          <FieldLabel>Email</FieldLabel>
          <FieldInput
            type="text"
            disabled={true}
            placeholder="Placeholder"
            value={'email'}
            onChange={() => undefined}
          />
          <FieldHint />
          <FieldError />
        </Field>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <label
          class="sc-hKgILt fopLzU"
          for="field-1"
        >
          Email
        </label>
        <div
          class="sc-iBPRYJ ipEIjR"
        >
          <input
            aria-describedby="field-hint-1"
            aria-invalid="false"
            class="sc-fubCfw bUaIIY"
            disabled=""
            id="field-1"
            name="password"
            placeholder="Placeholder"
            type="text"
            value="email"
          />
        </div>
        <p
          class="sc-hKgILt clHUCC"
          id="field-hint-1"
        >
          Description line
        </p>
      </div>
    `);
  });
});
