import { PlusCircle } from '@strapi/icons';
import { render as renderRTL } from '@test/utils';

import { FieldAction, Field, FieldHint, FieldLabel, FieldError, type FieldProps } from '../../Field';
import { TextInput, TextInputProps } from '../TextInput';

type ComponentProps = Partial<TextInputProps>;

const Component = (props: ComponentProps) => <TextInput aria-label="text label" {...props} />;

const render = (props?: ComponentProps) => renderRTL(<Component {...props} />);

describe('TextInput', () => {
  it('should pass the specific Field component props to the the component', () => {
    const { getByRole, rerender } = render({ required: true, name: 'name' });

    expect(getByRole('textbox')).toBeRequired();
    expect(getByRole('textbox')).toHaveAttribute('name', 'name');

    rerender(<Component error="text error" />);
  });

  it('should render an error with label if supplied', () => {
    const renderField = (
      props: Partial<TextInputProps> & Pick<FieldProps, 'error'> & { label: string } = { label: '' },
    ) =>
      renderRTL(
        <Field id="with_field" error={props.error}>
          <FieldLabel>{props.label}</FieldLabel>
          <TextInput id="with_field" error={props.error} {...props} />
          <FieldError />
        </Field>,
      );

    const { getByText } = renderField({
      error: 'error',
      label: 'Label',
    });

    expect(getByText('Label')).toBeInTheDocument();
    expect(getByText('error')).toBeInTheDocument();
  });

  it('should render a hint if supplied', () => {
    const renderField = (
      props: Partial<TextInputProps> & Pick<FieldProps, 'hint'> & { label: string } = { label: '' },
    ) =>
      renderRTL(
        <Field id="with_field" hint={props.hint}>
          <FieldLabel>{props.label}</FieldLabel>
          <TextInput id="with_field" {...props} />
          <FieldHint />
        </Field>,
      );

    const { getByText } = renderField({
      hint: 'hint',
      label: 'Label',
    });

    expect(getByText('hint')).toBeInTheDocument();
  });

  it('should pass other props to the underlying FieldInput component', async () => {
    const onChange = jest.fn();

    const { getByRole, rerender, user } = render({
      onChange,
      value: 'Value',
      startAction: (
        <FieldAction label="start">
          <PlusCircle />
        </FieldAction>
      ),
      endAction: (
        <FieldAction label="end">
          <PlusCircle />
        </FieldAction>
      ),
    });

    expect(getByRole('textbox')).toHaveValue('Value');
    expect(getByRole('button', { name: 'start' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'end' })).toBeInTheDocument();

    await user.type(getByRole('textbox'), 'test');

    expect(onChange).toHaveBeenCalledTimes(4);

    rerender(<Component disabled value="Value" />);

    expect(getByRole('textbox')).toBeDisabled();
  });
});
