import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DismissibleLayer } from '../DismissibleLayer';

describe('DismissibleLayer', () => {
  it('should fire onEscapeKeyDown when the ESCAPE key is pressed', () => {
    const onEscapeKeyDownMock = jest.fn();
    const onPointerDownOutsideMock = jest.fn();
    render(
      <DismissibleLayer onEscapeKeyDown={onEscapeKeyDownMock} onPointerDownOutside={onPointerDownOutsideMock}>
        <h1>hello world</h1>
      </DismissibleLayer>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onEscapeKeyDownMock).toHaveBeenCalled();
  });

  it('should fire onPointerDownOutside when the user clicks outside the DismissibleLayer', () => {
    const onPointerDownOutsideMock = jest.fn();
    const onEscapeKeyDownMock = jest.fn();
    render(
      <>
        <DismissibleLayer onPointerDownOutside={onPointerDownOutsideMock} onEscapeKeyDown={onEscapeKeyDownMock}>
          <h1>hello world</h1>
        </DismissibleLayer>
        <button type="button">Click me</button>
      </>,
    );

    const insideLayer = screen.getByText('hello world');

    fireEvent.mouseDown(insideLayer);

    expect(onPointerDownOutsideMock).not.toHaveBeenCalled();

    const outsideLayer = screen.getByText('Click me');

    fireEvent.pointerDown(outsideLayer);

    expect(onPointerDownOutsideMock).toHaveBeenCalled();
  });
});
