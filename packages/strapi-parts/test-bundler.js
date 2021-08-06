import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/en';
import 'jest-styled-components';

if (global.Intl) {
  Intl.NumberFormat = IntlPolyfill.NumberFormat;
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
} else {
  global.Intl = IntlPolyfill;
}

window.ResizeObserver = () => ({
  observe: () => {},
  disconnect: () => {},
});

window.IntersectionObserver = () => ({
  observe: () => {},
  disconnect: () => {},
});
