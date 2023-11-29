import { render, fireEvent, screen } from '@test/utils';

import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('snapshots document.body when the tooltip is not visible but exists in the DOM', () => {
    render(
      <Tooltip description="Content of the tooltip fefe">
        <button type="button">Show tooltip</button>
      </Tooltip>,
    );

    expect(document.body).toMatchSnapshot();
  });

  it('snapshots document.body when the button is focused (aria-describedby exists)', () => {
    render(
      <Tooltip description="Content of the tooltip fefe">
        <button type="button">Show tooltip</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByText('Show tooltip'));

    expect(document.body).toMatchSnapshot();
  });

  it('snapshots document.body with a label', () => {
    render(
      <Tooltip label="Content of the tooltip fefe">
        <button type="button">+</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByText('+'));

    expect(document.body).toMatchSnapshot();
  });
});
