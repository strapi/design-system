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

const realConsoleError = console.error.bind(console);
console.error = (msg) => {
  // This errors pops when we try to test portals with testing-library
  if (!msg.includes('Warning: render(): Rendering components directly into document.body is discouraged')) {
    realConsoleError(msg);
  }
};
