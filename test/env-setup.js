import { ResizeObserver } from '@juggle/resize-observer';
import IntlPolyfill from 'intl';

import 'intl/locale-data/jsonp/en';
import 'jest-styled-components';

beforeAll(() => {
  if (global.Intl) {
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  } else {
    global.Intl = IntlPolyfill;
  }

  global.ResizeObserver = ResizeObserver;

  class IntersectionObserver {
    // eslint-disable-next-line no-useless-constructor, no-empty-function
    constructor() {}

    observe() {}

    disconnect() {}
  }

  global.IntersectionObserver = IntersectionObserver;

  global.matchMedia = () => ({
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  /**
   * JSDOM doesn't implement PointerEvent so we need to mock our own implementation
   * Default to mouse left click interaction
   * https://github.com/radix-ui/primitives/issues/1822
   * https://github.com/jsdom/jsdom/pull/2666
   */
  class MockPointerEvent extends Event {
    button;

    ctrlKey;

    pointerType;

    constructor(type, props) {
      super(type, props);
      this.button = props.button || 0;
      this.ctrlKey = props.ctrlKey || false;
      this.pointerType = props.pointerType || 'mouse';
    }
  }

  window.PointerEvent = MockPointerEvent;
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  window.HTMLElement.prototype.releasePointerCapture = jest.fn();
  window.HTMLElement.prototype.hasPointerCapture = jest.fn();
});
