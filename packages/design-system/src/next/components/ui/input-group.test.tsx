import * as React from 'react';

import { Search } from '@strapi/icons';
import { render } from '@test/utils';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './input-group';

describe('InputGroup', () => {
  it('renders a group with an input, addons and a button', async () => {
    const onClick = jest.fn();
    const { getByRole, getByText, user } = render(
      <InputGroup>
        <InputGroupInput aria-label="Search" />
        <InputGroupAddon>
          <Search aria-hidden />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText>results</InputGroupText>
          <InputGroupButton onClick={onClick}>Go</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>,
    );

    expect(getByRole('textbox', { name: 'Search' })).toHaveAttribute('data-slot', 'input-group-control');
    expect(getByText('results')).toBeInTheDocument();

    await user.click(getByRole('button', { name: 'Go' }));

    expect(onClick).toHaveBeenCalled();
    expect(getByRole('button', { name: 'Go' })).toHaveAttribute('type', 'button');
  });

  it('focuses the input when an addon is clicked', async () => {
    const { getByRole, getByText, user } = render(
      <InputGroup>
        <InputGroupInput aria-label="Amount" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>EUR</InputGroupText>
        </InputGroupAddon>
      </InputGroup>,
    );

    await user.click(getByText('EUR'));

    expect(getByRole('textbox', { name: 'Amount' })).toHaveFocus();
  });

  it('forwards the refs of its parts', () => {
    const groupRef = React.createRef<HTMLDivElement>();
    const inputRef = React.createRef<HTMLInputElement>();
    const textareaRef = React.createRef<HTMLTextAreaElement>();
    const buttonRef = React.createRef<HTMLButtonElement>();

    const { getByRole, getAllByRole } = render(
      <InputGroup ref={groupRef}>
        <InputGroupInput ref={inputRef} aria-label="input" />
        <InputGroupTextarea ref={textareaRef} aria-label="textarea" />
        <InputGroupButton ref={buttonRef}>Go</InputGroupButton>
      </InputGroup>,
    );

    expect(groupRef.current).toBe(getAllByRole('group')[0]);
    expect(inputRef.current).toBe(getByRole('textbox', { name: 'input' }));
    expect(textareaRef.current).toBe(getByRole('textbox', { name: 'textarea' }));
    expect(buttonRef.current).toBe(getByRole('button', { name: 'Go' }));
  });
});
