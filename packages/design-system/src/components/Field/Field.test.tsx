import { PlusCircle } from '@strapi/icons';
import { render as renderRTL } from '@test/utils';

import { Field } from './index';

interface ComponentProps
  extends Pick<Field.Props, 'required' | 'error' | 'hint' | 'counter' | 'name' | 'id'>, Field.InputProps {
  labelAction?: Field.LabelProps['action'];
}

const Component = ({ required, error, hint, counter, name, id, labelAction, ...restProps }: ComponentProps) => (
  <Field.Root required={required} error={error} hint={hint} counter={counter} name={name} id={id}>
    <Field.Label action={labelAction}>field label</Field.Label>
    <Field.Input {...restProps} />
    <Field.Error />
    <Field.Hint />
  </Field.Root>
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

  describe('counter', () => {
    it('shows the counter at the end of the hint row and describes the input with both', () => {
      const { getByRole, getByText } = render({ id: 'title', hint: 'max. 60 characters', counter: '5 / 60' });

      const hint = getByText('max. 60 characters');
      const counter = getByText('5 / 60');

      expect(counter.parentElement).toContainElement(hint);
      expect(hint.compareDocumentPosition(counter) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', 'title-hint title-counter');
    });

    it('shows a counter of 0 and describes the input with it', () => {
      const { getByRole, getByText } = render({ id: 'title', hint: 'max. 60 characters', counter: 0 });

      expect(getByText('0')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', 'title-hint title-counter');
    });

    it('keeps the counter on the error row when the error replaces the hint', () => {
      const { getByRole, getByText, queryByText } = render({
        id: 'title',
        hint: 'max. 60 characters',
        error: 'The value is too long',
        counter: '72 / 60',
      });

      expect(queryByText('max. 60 characters')).not.toBeInTheDocument();
      expect(getByText('72 / 60').parentElement).toContainElement(getByText('The value is too long'));
      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', 'title-error title-counter');
    });

    it('shows the counter alone without a hint, or with an error that has no message', () => {
      const { getByText, rerender } = render({ counter: '5 characters' });

      expect(getByText('5 characters')).toBeInTheDocument();

      rerender(<Component counter="5 characters" error />);

      expect(getByText('5 characters')).toBeInTheDocument();
    });

    it('renders the counter once', () => {
      const { getAllByText } = render({ error: 'The value is too long', counter: '72 / 60' });

      expect(getAllByText('72 / 60')).toHaveLength(1);
    });

    it('keeps the counter when only Field.Hint is rendered and an error shows', () => {
      const { getByRole, getByText } = renderRTL(
        <Field.Root id="title" error="The value is too long" counter="72 / 60">
          <Field.Label>field label</Field.Label>
          <Field.Input />
          <Field.Hint />
        </Field.Root>,
      );

      expect(getByText('72 / 60')).toBeInTheDocument();
      expect(getByRole('textbox').getAttribute('aria-describedby')).toContain('title-counter');
    });

    it('keeps the counter when only Field.Error is rendered and there is no error', () => {
      const { getByRole, getByText } = renderRTL(
        <Field.Root id="title" counter="5 / 60">
          <Field.Label>field label</Field.Label>
          <Field.Input />
          <Field.Error />
        </Field.Root>,
      );

      expect(getByText('5 / 60')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', 'title-counter');
    });

    it('leaves the counter out of the description when no part can show it', () => {
      const { getByRole } = renderRTL(
        <Field.Root id="title" counter="5 / 60">
          <Field.Label>field label</Field.Label>
          <Field.Input />
        </Field.Root>,
      );

      expect(getByRole('textbox')).not.toHaveAttribute('aria-describedby');
    });

    it('does not describe the input with an error that has no message', () => {
      const { getByRole } = render({ id: 'title', error: true, hint: 'field hint' });

      expect(getByRole('textbox')).not.toHaveAttribute('aria-describedby');
    });

    it('leaves the hint and the error as they were without a counter', () => {
      const { getByRole, getByText, rerender } = render({ id: 'title', hint: 'field hint' });

      // Not wrapped in a row: the hint is a direct child of the root, like the input
      expect(getByText('field hint').parentElement).toContainElement(getByRole('textbox'));
      expect(document.getElementById('title-counter')).toBeNull();
      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', 'title-hint');

      rerender(<Component id="title" error="field error" />);

      expect(getByRole('textbox')).toHaveAttribute('aria-describedby', 'title-error');
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

  describe('Field.Input props', () => {
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
          <Field.Action onClick={startClick} label="start">
            <PlusCircle />
          </Field.Action>
        ),
        endAction: (
          <Field.Action onClick={endClick} label="end">
            <PlusCircle />
          </Field.Action>
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
