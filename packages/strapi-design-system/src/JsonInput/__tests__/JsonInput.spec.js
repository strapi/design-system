import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { JsonInput } from '../JsonInput';

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

// Codemirror inner dependency, reference : https://github.com/jsdom/jsdom/issues/3002
document.createRange = () => {
  const range = new Range();
  range.getClientRects = jest.fn(() => ({
    item: () => null,
    length: 0,
  }));

  return range;
};

const onChange = jest.fn();
const onError = jest.fn();

const JSON_DATA = [
  { a: 3, b: 4 },
  { a: 5, b: 6 },
];

describe('JsonInput', () => {
  beforeAll(() => {
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should render default non-editable json content', () => {
    const { container } = render(<JsonInput value={JSON_DATA} onChange={onChange} onError={onError} />);
    const readonlyJsonInput = container.querySelector('div[contenteditable="false"]');

    expect(readonlyJsonInput).toBeInTheDocument();
  });

  it('should render with editable json content', () => {
    const { container } = render(<JsonInput value={JSON_DATA} onChange={onChange} onError={onError} editable />);
    const editableJsonInput = container.querySelector(`div[contenteditable="true"]`);

    expect(editableJsonInput).toBeInTheDocument();
  });

  it('should display provided json schema', () => {
    const { container } = render(<JsonInput value={JSON_DATA} onChange={onChange} onError={onError} />);

    const readonlyJsonInput = container.querySelector('div[contenteditable="false"]');
    expect(readonlyJsonInput.textContent).toBe('[  {    "a": 3,    "b": 4  },  {    "a": 5,    "b": 6  }]');
  });

  it('should call on change callback with valid json schema change', async () => {
    const { container } = render(<JsonInput value={JSON_DATA} onChange={onChange} onError={onError} editable />);
    const jsonInput = container.querySelector('div[contenteditable="true"]');
    fireEvent.input(jsonInput, {
      target: { textContent: `[  {    "a": 3,    "b": 4  },  {    "a": 5,    "b": 6,    "c": 4  }]` },
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('should throw an error on change with wrong json schema', async () => {
    const { container } = render(<JsonInput value={JSON_DATA} onChange={onChange} onError={onError} editable />);
    const jsonInput = container.querySelector('div[contenteditable="true"]');
    fireEvent.input(jsonInput, {
      target: { textContent: `[  {    "a": 3,    "b": 4  },  {    "a": 5,    "b": 6,  }]` },
    });

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });
});
