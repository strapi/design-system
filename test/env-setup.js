import IntlPolyfill from 'intl';
import { ResizeObserver } from '@juggle/resize-observer';

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

  global.IntersectionObserver = () => ({
    observe() {},
    disconnect() {},
  });

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
});
