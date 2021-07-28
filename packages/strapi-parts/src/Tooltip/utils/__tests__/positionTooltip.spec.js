import { positionTooltip } from '../positionTooltip';

describe('positionTooltip', () => {
  let tooltipNode;
  let toggleSourceNode;

  beforeEach(() => {
    tooltipNode = {
      getBoundingClientRect: () => ({ width: 160, height: 40 }),
    };
    toggleSourceNode = {
      getBoundingClientRect: () => ({ left: 500, top: 300, width: 100, height: 30 }),
    };

    window.pageYOffset = 800;
  });

  it('positions the tooltip at the top of the toggle source', () => {
    const position = positionTooltip(tooltipNode, toggleSourceNode);

    expect(position).toEqual({ left: 470, top: 1052 });
  });

  it('positions the tooltip at the bottom of the toggle source', () => {
    const position = positionTooltip(tooltipNode, toggleSourceNode, 'bottom');

    expect(position).toEqual({ left: 470, top: 1138 });
  });

  it('positions the tooltip on the left of the toggle source', () => {
    const position = positionTooltip(tooltipNode, toggleSourceNode, 'left');

    expect(position).toEqual({ left: 332, top: 1095 });
  });

  it('positions the tooltip on the right of the toggle source', () => {
    const position = positionTooltip(tooltipNode, toggleSourceNode, 'right');

    expect(position).toEqual({ left: 608, top: 1095 });
  });
});
