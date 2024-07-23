import { Trash } from '@strapi/icons';
import { render, screen } from '@test/utils';

import { IconButton } from '../IconButton';

import * as Accordion from './Accordion';

describe('Accordion', () => {
  const Component = (props?: Accordion.Props) => {
    return (
      <Accordion.Root {...props}>
        <Accordion.Item value="acc-01">
          <Accordion.Header>
            <Accordion.Trigger>Trigger</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    );
  };

  it('should render a heading & button by default', () => {
    render(<Component />);

    expect(screen.getByRole('heading', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();

    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('should render the content of the accordion when the trigger is clicked', async () => {
    const { user } = render(<Component />);

    await user.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(screen.getByRole('region', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it("should open the region by defualt when it's value is passed as the defaultValue", () => {
    render(<Component defaultValue="acc-01" />);

    expect(screen.getByRole('region', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should close the region when it is open and the trigger is clicked', async () => {
    const { user } = render(<Component defaultValue="acc-01" />);

    await user.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it("should not trigger the accordion when it's disabled", async () => {
    const { user } = render(<Component disabled />);

    await user.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('should not trigger the accordion when actions are present and clicked', async () => {
    const onClickSpy = jest.fn();

    const { user } = render(
      <Accordion.Root>
        <Accordion.Item value="acc-01">
          <Accordion.Header>
            <Accordion.Trigger>Trigger</Accordion.Trigger>
            <Accordion.Actions>
              <IconButton label="delete" onClick={onClickSpy}>
                <Trash />
              </IconButton>
            </Accordion.Actions>
          </Accordion.Header>
          <Accordion.Content>Content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'delete' }));

    expect(onClickSpy).toHaveBeenCalled();
    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('should only allow one region open at a time when there are many accordions', async () => {
    const { user } = render(
      <Accordion.Root>
        <Accordion.Item value="acc-01">
          <Accordion.Header>
            <Accordion.Trigger>Trigger 1</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="acc-02">
          <Accordion.Header>
            <Accordion.Trigger>Trigger 2</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="acc-03">
          <Accordion.Header>
            <Accordion.Trigger>Trigger 3</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Content 3</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    expect(screen.getByRole('heading', { name: 'Trigger 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Trigger 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Trigger 3' })).toBeInTheDocument();

    expect(screen.queryByRole('region', { name: 'Trigger 1' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Trigger 2' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Trigger 3' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Trigger 1' }));

    expect(screen.getByRole('region', { name: 'Trigger 1' })).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Trigger 2' }));

    expect(screen.queryByRole('region', { name: 'Trigger 1' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Trigger 2' })).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('should allow to be controlled', async () => {
    const onValueChangeSpy = jest.fn();

    const { user, rerender } = render(<Component value="acc-01" onValueChange={onValueChangeSpy} />);

    expect(screen.getByRole('region', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(onValueChangeSpy).toHaveBeenCalledWith('');
    expect(screen.getByRole('region', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();

    rerender(<Component value="" onValueChange={onValueChangeSpy} />);

    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(onValueChangeSpy).toHaveBeenCalledWith('acc-01');
    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});
