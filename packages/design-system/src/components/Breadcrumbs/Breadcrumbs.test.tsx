import { render, screen } from '@test/utils';

import { Breadcrumbs } from './Breadcrumbs';
import { Crumb } from './Crumb';

describe('Breadcrumb', () => {
  it('should render only one crumb without any separator', async () => {
    render(
      <Breadcrumbs label="test">
        <Crumb>First</Crumb>
        {undefined && <Crumb>Second</Crumb>}
      </Breadcrumbs>,
    );

    const crumbList = screen.getAllByRole('listitem');

    expect(crumbList.length).toEqual(1);
  });

  it('should render two crumbs with only one separator', async () => {
    render(
      <Breadcrumbs label="test">
        <Crumb>First</Crumb>
        <Crumb>Second</Crumb>
      </Breadcrumbs>,
    );

    const crumbList = screen.getAllByRole('listitem');

    expect(crumbList.length).toEqual(2);
  });
});
