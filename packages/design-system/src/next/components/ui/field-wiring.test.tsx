import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { Combobox, ComboboxOption } from './combobox';
import { DatePicker } from './date-picker';
import { DateTimePicker } from './date-time-picker';
import { Field, FieldError, FieldHint, FieldLabel } from './field';
import { LocaleProvider, useLocale } from './locale-provider';
import { NumberInput } from './number-input';
import { Select, SelectContent, SelectItem, SelectTrigger } from './select';

/*
 * Every control reads the closest `Field`, like the legacy ones: the label points at it, the error describes it
 * and marks it invalid, and the required flag reaches it. No control here receives an id or an aria prop
 */
const renderInField = (control: React.ReactNode, { error, hint }: { error?: string; hint?: string } = {}) =>
  render(
    <Field id="field" name="field-name" required error={error} hint={hint}>
      <FieldLabel>Label</FieldLabel>
      {control}
      <FieldHint />
      <FieldError />
    </Field>,
  );

const CONTROLS: Array<[string, React.ReactNode]> = [
  [
    'Combobox',
    <Combobox key="combobox">
      <ComboboxOption value="a">A</ComboboxOption>
    </Combobox>,
  ],
  [
    'Select',
    <Select<string> key="select">
      <SelectTrigger />
      <SelectContent>
        <SelectItem value="a">A</SelectItem>
      </SelectContent>
    </Select>,
  ],
  ['DatePicker', <DatePicker key="date-picker" />],
  ['NumberInput', <NumberInput key="number-input" />],
];

describe('Field wiring', () => {
  it.each(CONTROLS)('labels the %s', (_, control) => {
    renderInField(control);

    expect(screen.getByLabelText(/^Label/, { selector: '[id="field"]' })).toBeInTheDocument();
  });

  it.each(CONTROLS)('describes the %s with the error and marks it invalid', (_, control) => {
    renderInField(control, { error: 'Too short', hint: 'A hint' });

    const element = document.getElementById('field');

    expect(element).toHaveAttribute('aria-describedby', 'field-error');
    expect(element).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Too short')).toHaveAttribute('id', 'field-error');
  });

  it.each(CONTROLS)('describes the %s with the hint when there is no error', (_, control) => {
    renderInField(control, { hint: 'A hint' });

    const element = document.getElementById('field');

    expect(element).toHaveAttribute('aria-describedby', 'field-hint');
    expect(element).not.toHaveAttribute('aria-invalid', 'true');
  });

  it('labels the DateTimePicker group, not an input, and wires both inputs like the legacy picker', () => {
    renderInField(<DateTimePicker />, { error: 'Required' });

    expect(screen.getByRole('group', { name: 'Label' })).toBeInTheDocument();

    // Only the group matches the label, as with the legacy picker
    expect(screen.getByLabelText(/^Label/)).toHaveAttribute('role', 'group');

    const date = document.getElementById('field-date');
    const time = document.getElementById('field-time');

    expect(date).toHaveAttribute('aria-label', 'Choose date');
    expect(time).toHaveAttribute('aria-label', 'Choose time');

    for (const element of [date, time]) {
      expect(element).toHaveAttribute('aria-describedby', 'field-error');
      expect(element).toHaveAttribute('aria-invalid', 'true');
    }
  });

  it('lets the props of a control win outside a Field', () => {
    render(<DatePicker id="own" aria-label="Own" aria-invalid aria-describedby="own-help" />);

    const element = screen.getByRole('combobox', { name: 'Own' });

    expect(element).toHaveAttribute('id', 'own');
    expect(element).toHaveAttribute('aria-describedby', 'own-help');
    expect(element).toHaveAttribute('aria-invalid', 'true');
  });
});

describe('LocaleProvider', () => {
  const Probe = ({ locale }: { locale?: string }) => <span>{useLocale(locale)}</span>;

  it('gives its locale to the components below it', () => {
    render(
      <LocaleProvider locale="fr-FR">
        <Probe />
      </LocaleProvider>,
    );

    expect(screen.getByText('fr-FR')).toBeInTheDocument();
  });

  it('loses to the locale prop of a component', () => {
    render(
      <LocaleProvider locale="fr-FR">
        <Probe locale="de-DE" />
      </LocaleProvider>,
    );

    expect(screen.getByText('de-DE')).toBeInTheDocument();
  });

  it('falls back to the browser language without a provider', () => {
    render(<Probe />);

    expect(screen.getByText(navigator.language)).toBeInTheDocument();
  });

  it('formats a NumberInput with the locale of the provider', () => {
    render(
      <LocaleProvider locale="de-DE">
        <NumberInput aria-label="Amount" value={1234.5} onValueChange={() => {}} />
      </LocaleProvider>,
    );

    expect(screen.getByRole('textbox', { name: 'Amount' })).toHaveValue('1.234,5');
  });
});
