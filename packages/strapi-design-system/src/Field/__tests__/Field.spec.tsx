import { PlusCircle } from '@strapi/icons';
import { render as renderRTL } from '@test/utils';

import {
  Field,
  FieldProps,
  FieldAction,
  FieldError,
  FieldHint,
  FieldLabel,
  FieldInput,
  FieldInputProps,
  FieldLabelProps,
} from '../index';

interface ComponentProps extends Pick<FieldProps, 'required' | 'error' | 'hint' | 'name'>, FieldInputProps {
  labelAction?: FieldLabelProps['action'];
}

const Component = ({ required, error, hint, name, labelAction, ...restProps }: ComponentProps) => (
  <Field required={required} error={error} hint={hint} name={name}>
    <FieldLabel action={labelAction}>field label</FieldLabel>
    <FieldInput {...restProps} />
    <FieldError />
    <FieldHint />
  </Field>
);

const render = (props: ComponentProps) => renderRTL(<Component {...props} />);

describe('Field', () => {
  describe('rendering', () => {
    it('should by default render a text input and not the error or hint', () => {
      const { getByRole } = render({});

      expect(getByRole('textbox')).toBeInTheDocument();
    });

    it('should render a hint if passed', () => {
      const { getByText, getByRole } = render({ hint: 'field hint' });

      expect(getByText('field hint')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', expect.stringContaining('hint'));
    });

    it('should render a ReactNode hint if passed', () => {
      const { getByText, getByRole } = render({ hint: <>field hint</> });

      expect(getByText('field hint')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', expect.stringContaining('hint'));
    });

    it('should render the error if passed and if the hint is passed, it should not render that', () => {
      const { getByRole, getByText, queryByText, rerender } = render({ error: 'field error' });

      expect(getByText('field error')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
      expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');

      rerender(<Component error="field error" hint="field hint" />);

      expect(queryByText('field hint')).not.toBeInTheDocument();
      expect(getByText('field error')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
      expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should render the error if passed and if the ReactNode hint is passed, it should not render that', () => {
      const { getByRole, getByText, queryByText, rerender } = render({ error: 'field error' });

      expect(getByText('field error')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
      expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');

      rerender(<Component error="field error" hint={<>field hint</>} />);

      expect(queryByText('field hint')).not.toBeInTheDocument();
      expect(getByText('field error')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
      expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should render the label action if passed', () => {
      const { getByText } = render({ labelAction: 'action' });

      expect(getByText('action')).toBeInTheDocument();
    });
  });

  describe('Field props', () => {
    it('should handle the required prop correctly', () => {
      const { getByText, getByRole } = render({ required: true });

      expect(getByText('*')).toBeInTheDocument();
      expect(getByRole('textbox')).toBeRequired();
    });

    it('should handle the name prop correctly', () => {
      const { getByRole } = render({ name: 'field-name' });

      expect(getByRole('textbox')).toHaveAttribute('name', 'field-name');
    });
  });

  describe('FieldInput props', () => {
    it('should handle the disabled prop correctly', async () => {
      const onChange = jest.fn();

      const { getByRole, user } = render({ disabled: true, onChange });

      expect(getByRole('textbox')).toBeDisabled();

      await user.type(getByRole('textbox'), 'test');

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should handle the onChange prop correctly', async () => {
      const onChange = jest.fn();
      const { getByRole, user } = render({ onChange });

      await user.type(getByRole('textbox'), 'test');

      expect(onChange).toHaveBeenCalled();
    });

    it('should be able to be controlled with a value', async () => {
      const { getByRole, user } = render({ value: 'test' });

      expect(getByRole('textbox')).toHaveValue('test');

      await user.type(getByRole('textbox'), 'apple');

      expect(getByRole('textbox')).toHaveValue('test');
    });

    it('should render the actions when passed and they should be clickable', async () => {
      const startClick = jest.fn();
      const endClick = jest.fn();

      const { getByRole, user } = render({
        startAction: (
          <FieldAction onClick={startClick} label="start">
            <PlusCircle />
          </FieldAction>
        ),
        endAction: (
          <FieldAction onClick={endClick} label="end">
            <PlusCircle />
          </FieldAction>
        ),
      });

      expect(getByRole('button', { name: 'start' })).toBeInTheDocument();
      expect(getByRole('button', { name: 'end' })).toBeInTheDocument();

      await user.click(getByRole('button', { name: 'start' }));
      await user.click(getByRole('button', { name: 'end' }));

      expect(startClick).toHaveBeenCalled();
      expect(endClick).toHaveBeenCalled();
    });
  });
});
