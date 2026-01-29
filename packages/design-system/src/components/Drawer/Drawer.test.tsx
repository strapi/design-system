import { render, screen } from '@test/utils';

import { Button } from '../Button';

import * as Drawer from './Drawer';

const DrawerHeader = ({ hasClose = true, hasToggle = true }: { hasClose?: boolean; hasToggle?: boolean }) => (
  <Drawer.Header hasClose={hasClose} hasToggle={hasToggle}>
    <Drawer.Title>Drawer title</Drawer.Title>
  </Drawer.Header>
);

const defaultProps = {
  trigger: (
    <Drawer.Trigger>
      <Button>Open drawer</Button>
    </Drawer.Trigger>
  ),
  content: (
    <Drawer.Content direction="right">
      <DrawerHeader />
      <Drawer.Body>
        <p>Drawer body content</p>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.Close>
          <Button variant="tertiary">Cancel</Button>
        </Drawer.Close>
        <Button>Confirm</Button>
      </Drawer.Footer>
    </Drawer.Content>
  ),
};

describe('Drawer', () => {
  describe('without headerVisible', () => {
    it('should open the drawer when the trigger is clicked', async () => {
      const { user } = render(
        <Drawer.Root>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      expect(screen.queryByRole('dialog', { name: 'Drawer title' })).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Open drawer' }));

      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Drawer title' })).toBeInTheDocument();
      expect(screen.getByText('Drawer body content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });

    it('should close the drawer when the close button is clicked', async () => {
      const { user } = render(
        <Drawer.Root defaultOpen>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Close drawer' }));

      expect(screen.queryByRole('dialog', { name: 'Drawer title' })).not.toBeInTheDocument();
    });

    it('should close the drawer when Cancel (Drawer.Close) is clicked', async () => {
      const { user } = render(
        <Drawer.Root defaultOpen>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(screen.queryByRole('dialog', { name: 'Drawer title' })).not.toBeInTheDocument();
    });

    it('should be open by default when defaultOpen is true', () => {
      render(
        <Drawer.Root defaultOpen>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();
      expect(screen.getByText('Drawer body content')).toBeInTheDocument();
    });

    it('should close the drawer when Escape is pressed', async () => {
      const { user } = render(
        <Drawer.Root defaultOpen>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      await user.keyboard('{Escape}');

      expect(screen.queryByRole('dialog', { name: 'Drawer title' })).not.toBeInTheDocument();
    });

    it('should close the drawer when the overlay is clicked', async () => {
      const { user } = render(
        <Drawer.Root defaultOpen>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();
      await user.click(screen.getByTestId('drawer-overlay'));

      expect(screen.queryByRole('dialog', { name: 'Drawer title' })).not.toBeInTheDocument();
    });

    it('should not render overlay when overlayVisible is false', () => {
      render(
        <Drawer.Root defaultOpen overlayVisible={false}>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();
      expect(screen.queryByTestId('drawer-overlay')).not.toBeInTheDocument();
    });

    it('should not display close button when hasClose is false', async () => {
      render(
        <Drawer.Root defaultOpen>
          <DrawerHeader hasClose={false} />
        </Drawer.Root>,
      );

      expect(screen.queryByRole('button', { name: 'Close drawer' })).not.toBeInTheDocument();
    });

    it('should call onOpenChange when open state changes', async () => {
      const onOpenChange = jest.fn();
      const { user } = render(
        <Drawer.Root onOpenChange={onOpenChange}>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      await user.click(screen.getByRole('button', { name: 'Open drawer' }));
      expect(onOpenChange).toHaveBeenLastCalledWith(true);

      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });

    it('should support controlled open state', async () => {
      const onOpenChange = jest.fn();
      const { user, rerender } = render(
        <Drawer.Root open={false} onOpenChange={onOpenChange}>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      expect(screen.queryByRole('dialog', { name: 'Drawer title' })).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Open drawer' }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.queryByRole('dialog', { name: 'Drawer title' })).not.toBeInTheDocument();

      rerender(
        <Drawer.Root open onOpenChange={onOpenChange}>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );
      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('with headerVisible', () => {
    it('should render header without trigger when closed', () => {
      render(<Drawer.Root headerVisible>{defaultProps.content}</Drawer.Root>);

      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Drawer title' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Expand drawer' })).toBeInTheDocument();
      expect(screen.getByText('Drawer body content')).not.toBeVisible();
    });

    it('should expand and collapse body when toggle is clicked', async () => {
      const { user } = render(<Drawer.Root headerVisible>{defaultProps.content}</Drawer.Root>);

      await user.click(screen.getByRole('button', { name: 'Expand drawer' }));
      expect(screen.getByRole('button', { name: 'Collapse drawer' })).toBeInTheDocument();
      expect(screen.getByText('Drawer body content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Collapse drawer' }));
      expect(screen.getByText('Drawer body content')).not.toBeVisible();
      expect(screen.getByRole('button', { name: 'Expand drawer' })).toBeInTheDocument();
    });

    it('should close via Cancel when expanded', async () => {
      const { user } = render(<Drawer.Root headerVisible>{defaultProps.content}</Drawer.Root>);

      await user.click(screen.getByRole('button', { name: 'Expand drawer' }));
      await screen.findByRole('button', { name: 'Collapse drawer' });

      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(screen.getByText('Drawer body content')).not.toBeVisible();
      expect(screen.getByRole('button', { name: 'Expand drawer' })).toBeInTheDocument();
    });

    it('should not display toggle button when hasToggle is false', async () => {
      render(
        <Drawer.Root headerVisible>
          <DrawerHeader hasToggle={false} />
        </Drawer.Root>,
      );

      expect(screen.queryByRole('button', { name: 'Expand drawer' })).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have accessible dialog with title', async () => {
      const { user } = render(
        <Drawer.Root>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      await user.click(screen.getByRole('button', { name: 'Open drawer' }));

      const dialog = screen.getByRole('dialog', { name: 'Drawer title' });
      expect(dialog).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Drawer title' })).toBeInTheDocument();
    });
  });
});
