import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../../ThemeProvider';
import { lightTheme } from '../../../themes';
import { Breadcrumbs } from '../Breadcrumbs';
import { Crumb } from '../Crumb';

describe('Breadcrumb', () => {
  it('should render only one crumb without any separator', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Breadcrumbs label="test">
          <Crumb>First</Crumb>
          {undefined && <Crumb>Second</Crumb>}
        </Breadcrumbs>
      </ThemeProvider>,
    );

    const crumbList = container.querySelectorAll('li');
    // The divider is a span as well as the crumb text.
    // In this case, only one crumb should be rendered without any divider
    const spanList = container.querySelectorAll('span');

    expect(crumbList.length).toEqual(1);
    expect(spanList.length).toEqual(1);
  });

  it('should render two crumbs with only one separator', async () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Breadcrumbs label="test">
          <Crumb>First</Crumb>
          <Crumb>Second</Crumb>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    const crumbList = container.querySelectorAll('li');

    // The divider is a span as well as the crumb text which means:
    // 2 spans for the crumb texts + 1 for the divider
    const spanList = container.querySelectorAll('span');

    expect(crumbList.length).toEqual(2);
    expect(spanList.length).toEqual(3);
  });
});
