import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { InputJSON } from '../InputJSON';

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

const JSON_DATA = '[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6\n   }\n]';

const Component = (props) => (
  <ThemeProvider theme={lightTheme}>
    <InputJSON {...props} />
  </ThemeProvider>
);

describe('InputJSON', () => {
  beforeAll(() => {
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should display provided json schema formatted', () => {
    const { container } = render(<Component value={JSON_DATA} onChange={onChange} disabled onError={onError} />);

    const readonlyJsonInput = container.querySelector('div[contenteditable="false"]');
    expect(readonlyJsonInput.textContent).toBe(`[   {      "a":3,      "b":4   },   {      "a":5,      "b":6   }]`);
  });

  it('should not call on change callback with invalid json schema input', async () => {
    const { container } = render(<Component value={JSON_DATA} onChange={onChange} onError={onError} editable />);
    const jsonInput = container.querySelector('div[contenteditable="true"]');
    fireEvent.input(jsonInput, {
      target: { textContent: '[   {      "a":3,      "b":4   },   {      "a":5,      "b":"b,  }]' },
    });

    await waitFor(() => {
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it('should call on change callback with valid json schema input', async () => {
    const { container } = render(<Component value={JSON_DATA} onChange={onChange} onError={onError} editable />);
    const jsonInput = container.querySelector('div[contenteditable="true"]');
    fireEvent.input(jsonInput, {
      target: {
        textContent: '[   {      "a":3,      "b":4   },   {      "a":5,      "b":6,      "c":7   }]',
      },
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([
        { a: 3, b: 4 },
        { a: 5, b: 6, c: 7 },
      ]);
    });
  });
});
