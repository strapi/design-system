import { PlusCircle } from '@strapi/icons';
import { render as renderRTL } from '@test/utils';

import { Field } from '../Field';

import { TextInput, TextInputProps } from './TextInput';

type ComponentProps = Partial<TextInputProps>;

const Component = (props: ComponentProps) => <TextInput aria-label="text label" {...props} />;

const render = (props?: ComponentProps) => renderRTL(<Component {...props} />);

describe('TextInput', () => {
  it('should pass the specific Field component props to the the component', () => {
    const { getByRole } = render({ required: true, name: 'name' });

    expect(getByRole('textbox')).toBeRequired();
    expect(getByRole('textbox')).toHaveAttribute('name', 'name');
  });

  it('should render an error with label if supplied', () => {
    const renderField = (
      props: Partial<TextInputProps> & Pick<Field.Props, 'error'> & { label: string } = { label: '' },
    ) =>
      renderRTL(
        <Field.Root id="with_field" error={props.error}>
          <Field.Label>{props.label}</Field.Label>
          <TextInput id="with_field" error={props.error} {...props} />
          <Field.Error />
        </Field.Root>,
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
      props: Partial<TextInputProps> & Pick<Field.Props, 'hint'> & { label: string } = { label: '' },
    ) =>
      renderRTL(
        <Field.Root id="with_field" hint={props.hint}>
          <Field.Label>{props.label}</Field.Label>
          <TextInput id="with_field" {...props} />
          <Field.Hint />
        </Field.Root>,
      );

    const { getByText } = renderField({
      hint: 'hint',
      label: 'Label',
    });

    expect(getByText('hint')).toBeInTheDocument();
  });

  it('should pass other props to the underlying Field.Input component', async () => {
    const onChange = jest.fn();

    const { getByRole, rerender, user } = render({
      onChange,
      value: 'Value',
      startAction: (
        <Field.Action label="start">
          <PlusCircle />
        </Field.Action>
      ),
      endAction: (
        <Field.Action label="end">
          <PlusCircle />
        </Field.Action>
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
