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
        fill="currentColor"
        height="16"
        viewBox="0 0 32 32"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.061 23.939a1.503 1.503 0 0 1-2.125 2.125L16 18.125l-7.939 7.936a1.503 1.503 0 1 1-2.125-2.125L13.875 16 5.939 8.061a1.503 1.503 0 1 1 2.125-2.125L16 13.875l7.939-7.94a1.502 1.502 0 1 1 2.125 2.125L18.125 16z"
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
