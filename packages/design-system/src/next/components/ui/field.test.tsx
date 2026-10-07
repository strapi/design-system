import * as React from 'react';

import { render } from '@test/utils';

import { Field, FieldError, FieldHint, FieldLabel, useFieldControl, type FieldProps } from './field';
import { Input, type InputProps } from './input';

interface ComponentProps extends Pick<FieldProps, 'required' | 'error' | 'hint' | 'name' | 'id'>, InputProps {
  labelAction?: React.ReactNode;
}

const Component = ({ required, error, hint, name, id, labelAction, ...inputProps }: ComponentProps) => (
  <Field required={required} error={error} hint={hint} name={name} id={id}>
    <FieldLabel action={labelAction}>field label</FieldLabel>
    <Input {...inputProps} />
    <FieldError />
    <FieldHint />
  </Field>
);

const setup = (props: ComponentProps = {}) => render(<Component {...props} />);

describe('Field', () => {
  it('labels the input and renders neither a hint nor an error by default', () => {
    const { getByRole, container } = setup();

    const input = getByRole('textbox', { name: 'field label' });

    expect(input).not.toHaveAttribute('aria-describedby');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(container.querySelector('[data-slot=field-hint]')).toBeNull();
    expect(container.querySelector('[data-slot=field-error]')).toBeNull();
  });

  it('derives the ids of the label, the hint and the error from the id', () => {
    const { getByText, getByRole } = setup({ id: 'title', hint: 'field hint' });

    expect(getByRole('textbox')).toHaveAttribute('id', 'title');
    expect(getByText('field label')).toHaveAttribute('id', 'title-label');
    expect(getByText('field hint')).toHaveAttribute('id', 'title-hint');
    expect(getByRole('textbox')).toHaveAttribute('aria-describedby', 'title-hint');
  });

  it('renders a ReactNode hint and describes the input with it', () => {
    const { getByText, getByRole } = setup({ hint: <>field hint</> });

    expect(getByText('field hint')).toBeInTheDocument();
    expect(getByRole('textbox')).toHaveAccessibleDescription('field hint');
  });

  it('renders the error instead of the hint and marks the input as invalid', () => {
    const { getByText, queryByText, getByRole } = setup({ error: 'field error', hint: 'field hint' });

    expect(queryByText('field hint')).not.toBeInTheDocument();
    expect(getByText('field error')).toHaveAttribute('data-strapi-field-error');
    expect(getByRole('textbox')).toHaveAccessibleDescription('field error');
    expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('marks the input as invalid without a message when the error is true', () => {
    const { getByRole, container } = setup({ error: true });

    expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(container.querySelector('[data-slot=field-error]')).toBeNull();
    expect(container.querySelector('[data-slot=input-wrapper]')).toHaveAttribute('data-invalid');
  });

  it('renders the label action', () => {
    const { getByText } = setup({ labelAction: 'action' });

    expect(getByText('action')).toBeInTheDocument();
  });

  it('shows an asterisk and marks the input as required', () => {
    const { getByText, getByRole } = setup({ required: true });

    expect(getByText('*')).toHaveAttribute('aria-hidden', 'true');
    expect(getByRole('textbox')).toBeRequired();
  });

  it('passes the name to the input', () => {
    const { getByRole } = setup({ name: 'field-name' });

    expect(getByRole('textbox')).toHaveAttribute('name', 'field-name');
  });

  it('renders no label without children', () => {
    const { container } = render(
      <Field>
        <FieldLabel />
      </Field>,
    );

    expect(container.querySelector('label')).toBeNull();
  });

  it('forwards the refs of its parts', () => {
    const rootRef = React.createRef<HTMLDivElement>();
    const labelRef = React.createRef<HTMLLabelElement>();
    const hintRef = React.createRef<HTMLParagraphElement>();
    const errorRef = React.createRef<HTMLParagraphElement>();

    const { rerender, getByText } = render(
      <Field ref={rootRef} hint="hint">
        <FieldLabel ref={labelRef}>label</FieldLabel>
        <FieldHint ref={hintRef} />
      </Field>,
    );

    expect(rootRef.current).toHaveAttribute('data-slot', 'field');
    expect(labelRef.current).toBe(getByText('label'));
    expect(hintRef.current).toBe(getByText('hint'));

    rerender(
      <Field error="error">
        <FieldError ref={errorRef} />
      </Field>,
    );

    expect(errorRef.current).toBe(getByText('error'));
  });

  it('wires a custom control with useFieldControl', () => {
    const Custom = () => {
      const { invalid, required, ...props } = useFieldControl();

      return <div role="slider" aria-valuenow={1} aria-invalid={invalid} aria-required={required} {...props} />;
    };

    const { getByRole } = render(
      <Field error="error" required>
        <FieldLabel>custom</FieldLabel>
        <Custom />
        <FieldError />
      </Field>,
    );

    const slider = getByRole('slider');

    expect(slider).toHaveAttribute('aria-invalid', 'true');
    expect(slider).toHaveAttribute('aria-required', 'true');
    expect(slider).toHaveAccessibleDescription('error');
  });
});
