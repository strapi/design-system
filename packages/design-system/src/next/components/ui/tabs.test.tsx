import * as React from 'react';

import { render, screen } from '@test/utils';

import { Tabs, TabsContent, TabsList, TabsTrigger, type TabsProps } from './tabs';

const Component = (props: TabsProps) => (
  <Tabs defaultValue="first" {...props}>
    <TabsList aria-label="Manage your attribute">
      <TabsTrigger value="first">First</TabsTrigger>
      <TabsTrigger value="second">Second</TabsTrigger>
      <TabsTrigger value="third">Third</TabsTrigger>
    </TabsList>
    <TabsContent value="first">First panel</TabsContent>
    <TabsContent value="second">Second panel</TabsContent>
    <TabsContent value="third">Third panel</TabsContent>
  </Tabs>
);

describe('Tabs', () => {
  it('renders a tablist with the default tab selected', () => {
    render(<Component />);

    expect(screen.getByRole('tablist', { name: 'Manage your attribute' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First panel');
  });

  it('selects a tab on click', async () => {
    const onValueChange = jest.fn();
    const { user } = render(<Component onValueChange={onValueChange} />);

    await user.click(screen.getByRole('tab', { name: 'Second' }));

    expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second panel');
    expect(onValueChange).toHaveBeenCalledWith('second', expect.anything());
  });

  it('selects the focused tab with the arrow keys', async () => {
    const { user } = render(<Component />);

    await user.click(screen.getByRole('tab', { name: 'First' }));
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Second' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute('aria-selected', 'true');
  });

  it('disables every tab', async () => {
    const { user } = render(<Component disabled />);

    await user.click(screen.getByRole('tab', { name: 'Second' }));

    expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: 'Third' })).toHaveAttribute('data-disabled');
  });

  it('disables one tab by value', async () => {
    const { user } = render(<Component disabled="second" />);

    expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute('data-disabled');
    expect(screen.getByRole('tab', { name: 'Third' })).not.toHaveAttribute('data-disabled');

    await user.click(screen.getByRole('tab', { name: 'Third' }));

    expect(screen.getByRole('tab', { name: 'Third' })).toHaveAttribute('aria-selected', 'true');
  });

  it('marks the tab of hasError', () => {
    render(<Component hasError="third" />);

    expect(screen.getByRole('tab', { name: 'Third' })).toHaveAttribute('data-error');
    expect(screen.getByRole('tab', { name: 'First' })).not.toHaveAttribute('data-error');
  });

  it('renders the underline of the simple variant', () => {
    const { container } = render(<Component variant="simple" />);

    expect(container.querySelectorAll('[data-slot="tabs-bar"]')).toHaveLength(3);
    expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('data-variant', 'simple');
  });

  it('forwards the refs', () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    const listRef = React.createRef<HTMLDivElement>();

    render(
      <Tabs defaultValue="a">
        <TabsList ref={listRef}>
          <TabsTrigger ref={triggerRef} value="a">
            A
          </TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    expect(triggerRef.current).toBe(screen.getByRole('tab'));
    expect(listRef.current).toBe(screen.getByRole('tablist'));
  });
});
