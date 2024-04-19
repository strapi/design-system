import { PlusCircle } from '@strapi/icons';
import { render as renderRTL } from '@test/utils';

import { FieldAction } from '../../Field';
import { TextInput, TextInputProps } from '../TextInput';

type ComponentProps = Partial<TextInputProps>;

const Component = (props: ComponentProps) => <TextInput label="text label" {...props} />;

const render = (props?: ComponentProps) => renderRTL(<Component {...props} />);

describe('TextInput', () => {
  it('should render the label provided and the labelAction', () => {
    const { getByText, baseElement } = render({ labelAction: <PlusCircle /> });

    expect(getByText('text label')).toBeInTheDocument();
    expect(baseElement.querySelector('svg')).toBeInTheDocument();
  });

  it('should pass the specific Field component props to the the component', () => {
    const { getByText, getByRole, rerender } = render({ hint: 'text hint', required: true, name: 'name' });

    expect(getByText('text hint')).toBeInTheDocument();
    expect(getByRole('textbox')).toBeRequired();
    expect(getByRole('textbox')).toHaveAttribute('name', 'name');

    rerender(<Component error="text error" />);

    expect(getByText('text error')).toBeInTheDocument();
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
