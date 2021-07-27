import 'jest-styled-components';

window.ResizeObserver = () => ({
  observe: () => {},
  disconnect: () => {},
});

window.IntersectionObserver = () => ({
  observe: () => {},
  disconnect: () => {},
});
