import * as React from 'react';

import { Trash } from '@strapi/icons';
import { render, screen } from '@test/utils';

import {
  Accordion,
  AccordionActions,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  type AccordionProps,
} from './accordion';

const Component = (props: AccordionProps) => (
  <Accordion {...props}>
    <AccordionItem value="acc-01">
      <AccordionHeader>
        <AccordionTrigger>Trigger</AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>Content</AccordionContent>
    </AccordionItem>
  </Accordion>
);

describe('Accordion', () => {
  it('renders a heading and a button, closed by default', () => {
    render(<Component />);

    expect(screen.getByRole('heading', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('opens the region when the trigger is clicked, and closes it on a second click', async () => {
    const { user } = render(<Component />);

    await user.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(screen.getByRole('region', { name: 'Trigger' })).toHaveTextContent('Content');
    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();
  });

  it('opens the item of the defaultValue', () => {
    render(<Component defaultValue={['acc-01']} />);

    expect(screen.getByRole('region', { name: 'Trigger' })).toBeInTheDocument();
  });

  it('opens with the keyboard', async () => {
    const { user } = render(<Component />);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(screen.getByRole('region', { name: 'Trigger' })).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const { user } = render(<Component disabled />);

    await user.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();
  });

  it('does not toggle when an action is clicked', async () => {
    const onClick = jest.fn();
    const { user } = render(
      <Accordion>
        <AccordionItem value="acc-01">
          <AccordionHeader>
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionActions>
              <button type="button" aria-label="delete" onClick={onClick}>
                <Trash />
              </button>
            </AccordionActions>
          </AccordionHeader>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    await user.click(screen.getByRole('button', { name: 'delete' }));

    expect(onClick).toHaveBeenCalled();
    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();
  });

  it('opens one item at a time', async () => {
    const { user } = render(
      <Accordion>
        {[1, 2, 3].map((index) => (
          <AccordionItem key={index} value={`acc-0${index}`}>
            <AccordionHeader>
              <AccordionTrigger>{`Trigger ${index}`}</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>{`Content ${index}`}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>,
    );

    await user.click(screen.getByRole('button', { name: 'Trigger 1' }));

    expect(screen.getByText('Content 1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Trigger 2' }));

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('can be controlled', async () => {
    const onValueChange = jest.fn();
    const { user, rerender } = render(<Component value={['acc-01']} onValueChange={onValueChange} />);

    expect(screen.getByRole('region', { name: 'Trigger' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(onValueChange).toHaveBeenLastCalledWith([], expect.anything());
    expect(screen.getByRole('region', { name: 'Trigger' })).toBeInTheDocument();

    rerender(<Component value={[]} onValueChange={onValueChange} />);

    expect(screen.queryByRole('region', { name: 'Trigger' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(onValueChange).toHaveBeenLastCalledWith(['acc-01'], expect.anything());
  });

  it('renders the description and the caret position of the md size', () => {
    const { container } = render(
      <Accordion size="md">
        <AccordionItem value="acc-01">
          <AccordionHeader variant="secondary">
            <AccordionTrigger caretPosition="right" description="A description">
              Trigger
            </AccordionTrigger>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: /Trigger/ });

    expect(screen.getByText('A description')).toBeInTheDocument();
    expect(trigger.lastElementChild).toHaveAttribute('data-slot', 'accordion-caret');
    expect(container.querySelector('[data-slot="accordion-header"]')).toHaveAttribute('data-variant', 'secondary');
  });

  it('renders the icon in the sm size only', () => {
    const Icon = (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="icon" {...props} />;
    const { rerender } = render(
      <Accordion>
        <AccordionItem value="acc-01">
          <AccordionHeader>
            <AccordionTrigger icon={Icon}>Trigger</AccordionTrigger>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();

    rerender(
      <Accordion size="md">
        <AccordionItem value="acc-01">
          <AccordionHeader>
            <AccordionTrigger icon={Icon}>Trigger</AccordionTrigger>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('forwards the refs', () => {
    const rootRef = React.createRef<HTMLDivElement>();
    const triggerRef = React.createRef<HTMLButtonElement>();
    const headerRef = React.createRef<HTMLHeadingElement>();

    render(
      <Accordion ref={rootRef}>
        <AccordionItem value="acc-01">
          <AccordionHeader ref={headerRef}>
            <AccordionTrigger ref={triggerRef}>Trigger</AccordionTrigger>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>,
    );

    expect(rootRef.current).toHaveAttribute('data-slot', 'accordion');
    expect(headerRef.current).toBe(screen.getByRole('heading'));
    expect(triggerRef.current).toBe(screen.getByRole('button'));
  });
});
