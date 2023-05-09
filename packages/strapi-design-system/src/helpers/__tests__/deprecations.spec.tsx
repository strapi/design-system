import { render } from '@test/utils';

import { once, PREFIX } from '../deprecations';

describe('once', () => {
  it('should fire the callback once no matter how many times we call the returned function', () => {
    const callback = jest.fn();

    const callbackOnce = once(callback);

    callbackOnce();
    callbackOnce();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should fire the callback once even inside a react component', () => {
    const callback = jest.fn();
    const callbackTwo = jest.fn();

    const callbackOnce = once(callback);

    const TestComponent = () => {
      callbackTwo();
      callbackOnce();

      return <div />;
    };

    const { rerender } = render(<TestComponent />);

    rerender(<TestComponent />);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callbackTwo).toHaveBeenCalledTimes(2);
  });

  it('should throw an error if you try to call the returned function of once without passing once a function', () => {
    expect(() => {
      once('not a function' as any);
    }).toThrowError(`${PREFIX} once requires a function parameter`);
  });
});
