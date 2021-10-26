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

  it('positions the tooltip on the right of the toggle source when toggle source pos is top-left', () => {
    toggleSourceNode = {
      getBoundingClientRect: () => ({ left: 15, top: 15, width: 50, height: 20 }),
    };
    window.pageYOffset = 0;

    const position = positionTooltip(tooltipNode, toggleSourceNode);

    expect(position).toEqual({ left: 73, top: 3 });
  });

  it('positions the tooltip on the right of the toggle source when toggle source pos is bottom-left', () => {
    toggleSourceNode = {
      getBoundingClientRect: () => ({ left: 15, top: 760, width: 50, height: 20 }),
    };

    window.pageYOffset = 0;
    window.innerHeight = 800;

    const position = positionTooltip(tooltipNode, toggleSourceNode);

    expect(position).toEqual({ left: 73, top: 748 });
  });

  it('positions the tooltip below the toggle source when toggle source pos is top-center', () => {
    toggleSourceNode = {
      getBoundingClientRect: () => ({ left: 400, top: 15, width: 50, height: 20 }),
    };
    window.pageYOffset = 0;
    window.innerWidth = 800;

    const position = positionTooltip(tooltipNode, toggleSourceNode);

    expect(position).toEqual({ left: 345, top: 43 });
  });

  it('positions the tooltip above the toggle source when toggle source pos is bottom-center', () => {
    toggleSourceNode = {
      getBoundingClientRect: () => ({ left: 400, top: 760, width: 50, height: 20 }),
    };
    window.pageYOffset = 0;
    window.innerWidth = 800;

    const position = positionTooltip(tooltipNode, toggleSourceNode);

    expect(position).toEqual({ left: 345, top: 712 });
  });

  it('positions the tooltip on the left of the toggle source when toggle source pos is top-right', () => {
    toggleSourceNode = {
      getBoundingClientRect: () => ({ left: 750, right: 800, top: 15, width: 50, height: 20 }),
    };
    window.innerWidth = 800;
    window.pageYOffset = 0;

    const position = positionTooltip(tooltipNode, toggleSourceNode);

    expect(position).toEqual({ left: 582, top: 5 });
  });

  it('positions the tooltip on the left of the toggle source when toggle source pos is bottom-right', () => {
    toggleSourceNode = {
      getBoundingClientRect: () => ({ left: 750, right: 800, top: 760, width: 50, height: 20 }),
    };
    window.innerWidth = 800;
    window.innerHeight = 800;
    window.pageYOffset = 0;

    const position = positionTooltip(tooltipNode, toggleSourceNode);

    expect(position).toEqual({ left: 582, top: 750 });
  });
});
