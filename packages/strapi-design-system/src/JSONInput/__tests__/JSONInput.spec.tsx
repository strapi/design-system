import * as React from 'react';

import { render, fireEvent, waitFor } from '@test/utils';

import { JSONInput } from '../JSONInput';

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
    [Symbol.iterator]: () => [][Symbol.iterator](),
  }));

  return range;
};

const onChange = jest.fn();
const onError = jest.fn();

const JSON_DATA = '[\n   {\n      "a":3,\n      "b":4\n   },\n   {\n      "a":5,\n      "b":6\n   }\n]';

const Component = (props) => <JSONInput {...props} />;

describe('JSONInput', () => {
  beforeAll(() => {
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('Should display provided JSON schema formatted', () => {
    const { container } = render(<Component value={JSON_DATA} onChange={onChange} disabled onError={onError} />);

    const readonlyJSONInput = container.querySelector('div[contenteditable="false"]');
    expect(readonlyJSONInput).not.toBeNull();
    expect(readonlyJSONInput!.textContent).toBe(`[   {      "a":3,      "b":4   },   {      "a":5,      "b":6   }]`);
  });

  it("Should call parent's onChange callback with JSON string", async () => {
    const { container } = render(<Component value={JSON_DATA} onChange={onChange} onError={onError} editable />);
    const JSONInput = container.querySelector('div[contenteditable="true"]');
    expect(JSONInput).not.toBeNull();
    fireEvent.input(JSONInput!, {
      target: {
        textContent: '[   {      "a":3,      "b":4   },   {      "a":5,      "b":6,      "c":7   }]',
      },
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(
        '[   {      "a":3,      "b":4   },   {      "a":5,      "b":6,      "c":7   }]',
      );
    });
  });
});
