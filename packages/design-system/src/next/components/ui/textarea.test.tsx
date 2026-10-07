import * as React from 'react';

import { render } from '@test/utils';

import { Field, FieldError, FieldHint, FieldLabel } from './field';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('takes its label, name, hint and required flag from the Field', () => {
    const { getByRole } = render(
      <Field name="description" hint="A short text" required>
        <FieldLabel>Description</FieldLabel>
        <Textarea />
        <FieldHint />
      </Field>,
    );

    const textarea = getByRole('textbox', { name: 'Description' });

    expect(textarea).toHaveAttribute('name', 'description');
    expect(textarea).toBeRequired();
    expect(textarea).toHaveAccessibleDescription('A short text');
    expect(textarea).toHaveAttribute('aria-invalid', 'false');
  });

  it('is invalid and described by the error of the Field', () => {
    const { getByRole } = render(
      <Field error="Too long">
        <FieldLabel>Description</FieldLabel>
        <Textarea />
        <FieldError />
      </Field>,
    );

    expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(getByRole('textbox')).toHaveAccessibleDescription('Too long');
  });

  it('can be invalid, disabled and not resizable outside a Field', () => {
    const { getByRole } = render(<Textarea aria-label="Notes" hasError disabled resizable={false} />);

    const textarea = getByRole('textbox', { name: 'Notes' });

    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('resize-none');
  });

  it('calls onChange and forwards its ref', async () => {
    const onChange = jest.fn();
    const ref = React.createRef<HTMLTextAreaElement>();
    const { getByRole, user } = render(<Textarea ref={ref} aria-label="Notes" onChange={onChange} />);

    await user.type(getByRole('textbox'), 'abc');

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(ref.current).toBe(getByRole('textbox'));
    expect(ref.current).toHaveClass('resize-y');
  });
});
