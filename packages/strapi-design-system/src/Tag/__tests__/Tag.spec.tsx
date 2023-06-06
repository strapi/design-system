import { Cross } from '@strapi/icons';
import { render as renderRTL } from '@test/utils';

import { Tag, TagProps } from '../Tag';

const render = ({ icon = <Cross />, children = 'hello', ...props }: Partial<TagProps> = {}) =>
  renderRTL(
    <Tag icon={icon} {...props}>
      {children}
    </Tag>,
  );

describe('Tag', () => {
  it('should render the children and icon as expected', () => {
    const { getByRole, container } = render();

    expect(getByRole('button', { name: 'hello' })).toBeInTheDocument();

    expect(container.querySelector('svg')).toMatchInlineSnapshot(`
      <svg
        fill="none"
        height="1rem"
        viewBox="0 0 24 24"
        width="1rem"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 2.417 21.583 0 12 9.583 2.417 0 0 2.417 9.583 12 0 21.583 2.417 24 12 14.417 21.583 24 24 21.583 14.417 12 24 2.417Z"
          fill="#212134"
        />
      </svg>
    `);
  });

  it('should fire the onClick callback', async () => {
    const onClick = jest.fn();

    const { getByRole, user } = render({ onClick });

    await user.click(getByRole('button', { name: 'hello' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should handle the disabled prop correctly', async () => {
    const onClick = jest.fn();
    const { getByRole, user } = render({ disabled: true, onClick });

    expect(getByRole('button', { name: 'hello' })).toBeDisabled();
    expect(getByRole('button', { name: 'hello' })).toHaveAttribute('aria-disabled', 'true');

    await user.click(getByRole('button', { name: 'hello' }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
