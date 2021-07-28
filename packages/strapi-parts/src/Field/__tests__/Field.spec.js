import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { FieldLabel } from '../FieldLabel';
import { FieldHint } from '../FieldHint';
import { FieldError } from '../FieldError';
import { FieldInput } from '../FieldInput';
import { Field } from '../Field';
import { FieldAction } from '../FieldAction';

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
      .c0 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c3 {
        border: none;
        padding-left: 16px;
        padding-right: 16px;
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
        height: 2.5rem;
      }

      .c3::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3::placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3:disabled {
        background: inherit;
        color: inherit;
      }

      .c3:focus {
        outline: none;
      }

      .c2 {
        border: 1px solid #dcdce4;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
      }

      .c2:focus-within {
        border: 1px solid #4945ff;
      }

      <div>
        <label
          class="c0"
          for="field-1"
        >
          Email
        </label>
        <div
          class="c1 c2"
        >
          <input
            aria-invalid="false"
            class="c3"
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
      .c0 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c4 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c3 {
        border: none;
        padding-left: 16px;
        padding-right: 16px;
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
        height: 2.5rem;
      }

      .c3::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3::placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3:disabled {
        background: inherit;
        color: inherit;
      }

      .c3:focus {
        outline: none;
      }

      .c2 {
        border: 1px solid #dcdce4;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
      }

      .c2:focus-within {
        border: 1px solid #4945ff;
      }

      <div>
        <label
          class="c0"
          for="field-2"
        >
          Email
        </label>
        <div
          class="c1 c2"
        >
          <input
            aria-describedby="field-hint-2"
            aria-invalid="false"
            class="c3"
            id="field-2"
            name="email"
            placeholder="Placeholder"
            type="text"
            value="email"
          />
        </div>
        <p
          class="c4"
          id="field-hint-2"
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
      .c0 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c4 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #d02b20;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c3 {
        border: none;
        padding-left: 16px;
        padding-right: 16px;
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
        height: 2.5rem;
      }

      .c3::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3::placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3:disabled {
        background: inherit;
        color: inherit;
      }

      .c3:focus {
        outline: none;
      }

      .c2 {
        border: 1px solid #d02b20;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
      }

      .c2:focus-within {
        border: 1px solid #4945ff;
      }

      <div>
        <label
          class="c0"
          for="field-3"
        >
          Email
        </label>
        <div
          class="c1 c2"
        >
          <input
            aria-describedby="field-error-3"
            aria-invalid="true"
            class="c3"
            id="field-3"
            name="email"
            placeholder="Placeholder"
            type="text"
            value="too long email"
          />
        </div>
        <p
          class="c4"
          id="field-error-3"
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
      .c0 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c4 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c3 {
        border: none;
        padding-left: 16px;
        padding-right: 16px;
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
        height: 2.5rem;
      }

      .c3::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3::placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c3:disabled {
        background: inherit;
        color: inherit;
      }

      .c3:focus {
        outline: none;
      }

      .c2 {
        border: 1px solid #dcdce4;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
        color: #666687;
        background: #eaeaef;
      }

      .c2:focus-within {
        border: 1px solid #4945ff;
      }

      <div>
        <label
          class="c0"
          for="field-4"
        >
          Email
        </label>
        <div
          class="c1 c2"
          disabled=""
        >
          <input
            aria-describedby="field-hint-4"
            aria-invalid="false"
            class="c3"
            disabled=""
            id="field-4"
            name="password"
            placeholder="Placeholder"
            type="text"
            value="email"
          />
        </div>
        <p
          class="c4"
          id="field-hint-4"
        >
          Description line
        </p>
      </div>
    `);
  });

  it('snapshots with actions on both sides', () => {
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
            startAction={<FieldAction label="Show password">Show</FieldAction>}
            endAction={<FieldAction label="Show password">Hide</FieldAction>}
          />
          <FieldHint />
          <FieldError />
        </Field>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #32324d;
      }

      .c7 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c3 {
        padding-right: 8px;
        padding-left: 12px;
      }

      .c6 {
        padding-right: 12px;
        padding-left: 8px;
      }

      .c5 {
        border: none;
        padding-left: 0;
        padding-right: 0;
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
        height: 2.5rem;
      }

      .c5::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c5::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c5:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c5::placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c5:disabled {
        background: inherit;
        color: inherit;
      }

      .c5:focus {
        outline: none;
      }

      .c2 {
        border: 1px solid #dcdce4;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
        color: #666687;
        background: #eaeaef;
      }

      .c2:focus-within {
        border: 1px solid #4945ff;
      }

      .c4 {
        border: none;
        background: transparent;
        font-size: 1.6rem;
        width: auto;
        padding: 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      <div>
        <label
          class="c0"
          for="field-5"
        >
          Email
        </label>
        <div
          class="c1 c2"
          disabled=""
        >
          <div
            class="c3"
          >
            <button
              aria-label="Show password"
              class="c4"
            >
              Show
            </button>
          </div>
          <input
            aria-describedby="field-hint-5"
            aria-invalid="false"
            class="c5"
            disabled=""
            id="field-5"
            name="password"
            placeholder="Placeholder"
            type="text"
            value="email"
          />
          <div
            class="c6"
          >
            <button
              aria-label="Show password"
              class="c4"
            >
              Hide
            </button>
          </div>
        </div>
        <p
          class="c7"
          id="field-hint-5"
        >
          Description line
        </p>
      </div>
    `);
  });
});
