import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupItem,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  type SelectProps,
  type SelectTriggerProps,
} from './select';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

type SingleProps = Partial<SelectProps<string>> & Pick<SelectTriggerProps, 'onClear' | 'loading' | 'aria-invalid'>;

const SingleSelect = ({ onClear, loading, 'aria-invalid': ariaInvalid, ...props }: SingleProps) => (
  <Select<string> {...props}>
    <SelectTrigger aria-label="Pick Options" onClear={onClear} loading={loading} aria-invalid={ariaInvalid}>
      <SelectValue placeholder="Your option" />
    </SelectTrigger>
    <SelectContent>
      {OPTIONS.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const setup = (ui: React.ReactElement) => ({ user: userEvent.setup(), ...render(ui) });

const open = async (user: ReturnType<typeof userEvent.setup>, name?: string) => {
  await user.click(screen.getByRole('combobox', name ? { name } : undefined));

  return screen.findByRole('listbox');
};

describe('Select', () => {
  it('renders a combobox named by its aria-label, with the placeholder', () => {
    render(<SingleSelect />);

    const trigger = screen.getByRole('combobox', { name: 'Pick Options' });

    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Your option')).toBeInTheDocument();
  });

  it('is named by a label', () => {
    render(
      <>
        <label htmlFor="fruit">Fruit</label>
        <Select<string>>
          <SelectTrigger id="fruit" />
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
      </>,
    );

    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument();
  });

  it('opens on click and closes after choosing an option, showing its label', async () => {
    const onValueChange = jest.fn();
    const { user } = setup(<SingleSelect onValueChange={onValueChange} />);

    await open(user);

    await user.click(screen.getByRole('option', { name: 'Option 2' }));

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(onValueChange).toHaveBeenCalledWith('Option 2', expect.anything());
    expect(screen.getByRole('combobox')).toHaveTextContent('Option 2');
  });

  it('opens with the keyboard', async () => {
    const { user } = setup(<SingleSelect />);

    screen.getByRole('combobox').focus();
    await user.keyboard('{ArrowDown}');

    expect(await screen.findByRole('listbox')).toBeInTheDocument();
  });

  it('shows the label of a controlled value before the list ever opened', () => {
    render(
      <Select<string> value="b">
        <SelectTrigger aria-label="Letter" />
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Beta</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Beta');
  });

  it('keeps a controlled value until the parent changes it', async () => {
    const { user, rerender } = setup(<SingleSelect value="Option 1" />);

    await open(user);
    await user.click(screen.getByRole('option', { name: 'Option 2' }));

    expect(screen.getByRole('combobox')).toHaveTextContent('Option 1');

    rerender(<SingleSelect value="Option 3" />);

    expect(screen.getByRole('combobox')).toHaveTextContent('Option 3');
  });

  it('supports number values', async () => {
    const onValueChange = jest.fn();
    const { user } = setup(
      <Select<number> onValueChange={onValueChange}>
        <SelectTrigger aria-label="Count" />
        <SelectContent>
          <SelectItem value={1}>One</SelectItem>
          <SelectItem value={2}>Two</SelectItem>
        </SelectContent>
      </Select>,
    );

    await open(user);
    await user.click(screen.getByRole('option', { name: 'Two' }));

    expect(onValueChange).toHaveBeenCalledWith(2, expect.anything());
  });

  it('does not open when disabled', async () => {
    const { user } = setup(<SingleSelect disabled />);

    await user.click(screen.getByRole('combobox'));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  describe('clear', () => {
    it('shows no clear button without a value or without onClear', () => {
      const { rerender } = render(<SingleSelect onClear={jest.fn()} />);

      expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();

      rerender(<SingleSelect value="Option 1" />);

      expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    });

    it('clears an uncontrolled value, calls onClear and focuses the trigger', async () => {
      const onClear = jest.fn();
      const { user } = setup(<SingleSelect onClear={onClear} defaultValue="Option 1" />);

      expect(screen.getByRole('combobox')).toHaveTextContent('Option 1');

      await user.click(screen.getByRole('button', { name: 'Clear' }));

      expect(onClear).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('combobox')).toHaveTextContent('Your option');
      expect(screen.getByRole('combobox')).toHaveFocus();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('renders a value with a render function, like the legacy customizeContent', () => {
    render(
      <Select<string> value="Option 1">
        <SelectTrigger aria-label="Pick">
          <SelectValue>{() => 'Custom Content'}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Option 1">Option 1</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('marks the trigger invalid with aria-invalid', () => {
    render(<SingleSelect aria-invalid />);

    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('combobox')).toHaveAttribute('data-invalid');
  });

  describe('loading', () => {
    it('shows a loader in place of the caret and stays interactive', async () => {
      const { user } = setup(<SingleSelect loading />);

      expect(screen.getByRole('alert')).toHaveTextContent('Loading');

      await open(user);

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('shows no loader by default', () => {
      render(<SingleSelect />);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  it('renders groups with a label', async () => {
    const { user } = setup(
      <Select<string>>
        <SelectTrigger aria-label="Food" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );

    await open(user);

    expect(screen.getByRole('group', { name: 'Fruits' })).toBeInTheDocument();
  });

  it('forwards the refs', () => {
    const triggerRef = React.createRef<HTMLButtonElement>();

    render(
      <Select<string>>
        <SelectTrigger ref={triggerRef} aria-label="Pick" />
        <SelectContent />
      </Select>,
    );

    expect(triggerRef.current).toBe(screen.getByRole('combobox'));
  });

  describe('multiple', () => {
    const MultiSelect = (props: Partial<SelectProps<string, true>> & { withTags?: boolean }) => {
      const { withTags, ...rest } = props;

      return (
        <Select<string, true> multiple {...rest}>
          <SelectTrigger aria-label="Choose">
            <SelectValue placeholder="Choose an option" withTags={withTags} />
          </SelectTrigger>
          <SelectContent>
            {OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    };

    it('selects several options without closing the list', async () => {
      const onValueChange = jest.fn();
      const { user } = setup(<MultiSelect onValueChange={onValueChange} />);

      await open(user);

      await user.click(screen.getByRole('option', { name: 'Option 1' }));
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      expect(screen.getByRole('option', { name: 'Option 1' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('option', { name: 'Option 2' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(onValueChange).toHaveBeenLastCalledWith(['Option 1', 'Option 2'], expect.anything());

      await user.keyboard('{Escape}');

      expect(screen.getByRole('combobox')).toHaveTextContent('Option 1, Option 2');
    });

    it('renders the values as tags that remove a value', async () => {
      const onValueChange = jest.fn();
      const { user, container } = setup(
        <MultiSelect withTags defaultValue={['Option 1', 'Option 2']} onValueChange={onValueChange} />,
      );

      const tags = container.querySelectorAll('[data-slot="select-tag"]');

      expect(tags).toHaveLength(2);

      await user.click(tags[0].querySelector('[data-slot="select-tag-remove"]')!);

      expect(onValueChange).toHaveBeenCalledWith(['Option 2'], undefined);
      expect(container.querySelectorAll('[data-slot="select-tag"]')).toHaveLength(1);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('selects, then clears, all the options of a group item', async () => {
      const { user } = setup(
        <Select<string, true> multiple>
          <SelectTrigger aria-label="Choose" />
          <SelectContent>
            <SelectGroup>
              <SelectGroupItem values={['Option 1', 'Option 2']}>Group 1</SelectGroupItem>
              <SelectItem inset value="Option 1">
                Option 1
              </SelectItem>
              <SelectItem inset value="Option 2">
                Option 2
              </SelectItem>
            </SelectGroup>
            <SelectItem value="Option 3">Option 3</SelectItem>
          </SelectContent>
        </Select>,
      );

      await open(user);

      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(screen.getByRole('option', { name: 'Group 1' })).toHaveAttribute('data-state', 'indeterminate');

      await user.click(screen.getByRole('option', { name: 'Group 1' }));

      expect(screen.getByRole('option', { name: 'Option 1' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('option', { name: 'Option 2' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('option', { name: 'Group 1' })).toHaveAttribute('aria-selected', 'true');

      await user.click(screen.getByRole('option', { name: 'Group 1' }));

      expect(screen.getByRole('option', { name: 'Option 1' })).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByRole('option', { name: 'Option 2' })).toHaveAttribute('aria-selected', 'false');
    });
  });
});
