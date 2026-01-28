import { render, screen } from '@test/utils';

import { Button } from '../Button';

import * as Drawer from './Drawer';

const defaultProps = {
  trigger: (
    <Drawer.Trigger>
      <Button>Open drawer</Button>
    </Drawer.Trigger>
  ),
  content: (
    <Drawer.Content side="right">
      <Drawer.Header>
        <Drawer.Title>Drawer title</Drawer.Title>
      </Drawer.Header>
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
    it('should render only the trigger when closed', () => {
      render(
        <Drawer.Root>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      expect(screen.getByRole('button', { name: 'Open drawer' })).toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByText('Drawer body content')).not.toBeInTheDocument();
    });

    it('should open the drawer when the trigger is clicked', async () => {
      const { user } = render(
        <Drawer.Root>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      await user.click(screen.getByRole('button', { name: 'Open drawer' }));

      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();
      expect(screen.getByText('Drawer body content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Close drawer' })).toBeInTheDocument();
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

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByText('Drawer body content')).not.toBeInTheDocument();
    });

    it('should close the drawer when Cancel (Drawer.Close) is clicked', async () => {
      const { user } = render(
        <Drawer.Root defaultOpen>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should close the drawer when Escape is pressed', async () => {
      const { user } = render(
        <Drawer.Root defaultOpen>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();

      await user.keyboard('{Escape}');

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
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

    it('should call onOpenChange when open state changes', async () => {
      const onOpenChange = jest.fn();
      const { user } = render(
        <Drawer.Root onOpenChange={onOpenChange}>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      await user.click(screen.getByRole('button', { name: 'Open drawer' }));
      expect(onOpenChange).toHaveBeenCalledWith(true);

      await user.click(screen.getByRole('button', { name: 'Close drawer' }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('should support controlled open state', async () => {
      const onOpenChange = jest.fn();
      const { user, rerender } = render(
        <Drawer.Root open={false} onOpenChange={onOpenChange}>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Open drawer' }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      rerender(
        <Drawer.Root open={true} onOpenChange={onOpenChange}>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );
      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Close drawer' }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();

      rerender(
        <Drawer.Root open={false} onOpenChange={onOpenChange}>
          {defaultProps.trigger}
          {defaultProps.content}
        </Drawer.Root>,
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('with headerVisible', () => {
    it('should render header without trigger when closed', () => {
      render(
        <Drawer.Root headerVisible defaultOpen={false}>
          <Drawer.Content side="bottom">
            <Drawer.Header>
              <Drawer.Title>Drawer title</Drawer.Title>
            </Drawer.Header>
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
        </Drawer.Root>,
      );

      expect(screen.getByRole('dialog', { name: 'Drawer title' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Drawer title' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Expand drawer' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Open drawer' })).not.toBeInTheDocument();
      expect(screen.getByText('Drawer body content')).not.toBeVisible();
    });

    it('should expand and collapse body when toggle is clicked', async () => {
      const { user } = render(
        <Drawer.Root headerVisible defaultOpen={false}>
          <Drawer.Content side="bottom">
            <Drawer.Header>
              <Drawer.Title>Drawer title</Drawer.Title>
            </Drawer.Header>
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
        </Drawer.Root>,
      );

      // Expand
      await user.click(screen.getByRole('button', { name: 'Expand drawer' }));
      expect(screen.getByText('Drawer body content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Collapse drawer' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();

      // Collapse
      await user.click(screen.getByRole('button', { name: 'Collapse drawer' }));
      expect(screen.getByText('Drawer body content')).not.toBeVisible();
      expect(screen.getByRole('button', { name: 'Expand drawer' })).toBeInTheDocument();
    });

    it('should close via Cancel when expanded', async () => {
      const { user } = render(
        <Drawer.Root headerVisible defaultOpen={false}>
          <Drawer.Content side="bottom">
            <Drawer.Header>
              <Drawer.Title>Drawer title</Drawer.Title>
            </Drawer.Header>
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
        </Drawer.Root>,
      );

      await user.click(screen.getByRole('button', { name: 'Expand drawer' }));
      expect(screen.getByText('Drawer body content')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(screen.getByText('Drawer body content')).not.toBeVisible();
      expect(screen.getByRole('button', { name: 'Expand drawer' })).toBeInTheDocument();
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
