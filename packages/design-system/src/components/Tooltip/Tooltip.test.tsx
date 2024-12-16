import { render as renderHarness } from '@test/utils';

import { Button } from '../Button';

import { Tooltip, type TooltipProps } from './Tooltip';

const render = (props: Partial<TooltipProps> = {}) =>
  renderHarness(
    <Tooltip {...props}>
      <Button>My button</Button>
    </Tooltip>,
  );

describe('Tooltip', () => {
  it('should render and be accessible with a label', async () => {
    const { user, getByRole, findByRole } = render({
      label: 'My tooltip',
    });

    await user.hover(getByRole('button'));

    expect(await findByRole('tooltip', { name: 'My tooltip' })).toBeInTheDocument();
  });

  it('should render the label and not the description if both are provided', async () => {
    const { user, getByRole, findByRole, queryByRole } = render({
      label: 'My tooltip label',
      description: 'My tooltip description',
    });

    await user.hover(getByRole('button'));

    expect(await findByRole('tooltip', { name: 'My tooltip label' })).toBeInTheDocument();
    expect(queryByRole('tooltip', { name: 'My tooltip description' })).not.toBeInTheDocument();
  });

  it('should not render when the label is empty', async () => {
    const { user, getByRole, queryByRole } = render({
      label: '',
    });

    await user.hover(getByRole('button'));

    expect(queryByRole('tooltip', { name: 'My tooltip' })).not.toBeInTheDocument();
  });
});
