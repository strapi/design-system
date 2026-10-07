/* eslint-disable testing-library/no-container, testing-library/no-node-access */
import * as React from 'react';

import { fireEvent, render, waitFor } from '@test/utils';

import { Field, FieldError, FieldLabel } from './field';
import { JSONInput, type JSONInputRef } from './json-input';

const JSON_DATA = '[\n   {\n      "a":3,\n      "b":4\n   }\n]';

beforeAll(() => {
  window.IntersectionObserver = jest.fn().mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });

  // A CodeMirror dependency, see https://github.com/jsdom/jsdom/issues/3002
  document.createRange = () => {
    const range = new Range();

    range.getClientRects = jest.fn(() => ({
      item: () => null,
      length: 0,
      [Symbol.iterator]: () => [][Symbol.iterator](),
    }));

    return range;
  };
});

describe('JSONInput', () => {
  it('renders a read-only editor when disabled', () => {
    const { container } = render(<JSONInput value={JSON_DATA} disabled />);

    expect(container.querySelector('div[contenteditable="false"]')).not.toBeNull();
    expect(container.querySelector('[data-slot=json-input]')).toHaveAttribute('data-disabled');
  });

  it('calls onChange with the text of the editor', async () => {
    const onChange = jest.fn();
    const { container } = render(<JSONInput value={JSON_DATA} onChange={onChange} />);

    const editor = container.querySelector('div[contenteditable="true"]');

    expect(editor).not.toBeNull();

    fireEvent.input(editor!, { target: { textContent: '{ "a": 1 }' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('{ "a": 1 }');
    });
  });

  it('highlights the first line that does not parse', async () => {
    const { container } = render(<JSONInput value={'{\n  "a": 1,\n  oops\n}'} />);

    await waitFor(() => {
      expect(container.querySelector('[style*="background-color: yellow"]')).not.toBeNull();
    });
  });

  it('takes its id, required flag, error and description from the Field', () => {
    const { container } = render(
      <Field id="json" error="Invalid JSON" required>
        <FieldLabel>Data</FieldLabel>
        <JSONInput value="{}" />
        <FieldError />
      </Field>,
    );

    const root = container.querySelector('[data-slot=json-input]');

    expect(root).toHaveAttribute('id', 'json');
    expect(root).toHaveAttribute('aria-required', 'true');
    expect(root).toHaveAttribute('aria-describedby', 'json-error');
    expect(root).toHaveAttribute('data-invalid');
  });

  it('exposes focus on its ref', async () => {
    const ref = React.createRef<JSONInputRef>();

    render(<JSONInput ref={ref} value="{}" />);

    await waitFor(() => {
      expect(typeof ref.current?.focus).toBe('function');
    });
  });
});
