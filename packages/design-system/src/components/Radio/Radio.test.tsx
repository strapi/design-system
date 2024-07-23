import { render } from '@test/utils';

import { Radio } from './index';

describe('Radio', () => {
  it('selects a Radio button when a defaultValue is provided', () => {
    const { getByRole } = render(
      <Radio.Group defaultValue="pizza">
        <Radio.Item value="pizza">Pizza</Radio.Item>
        <Radio.Item value="bagel">Bagel</Radio.Item>
      </Radio.Group>,
    );

    expect(getByRole('radio', { name: 'Bagel' })).not.toBeChecked();
    expect(getByRole('radio', { name: 'Pizza' })).toBeChecked();
  });

  it('keeps all radio buttons unselected when there is no defaultValue or value', () => {
    const { getByRole } = render(
      <Radio.Group>
        <Radio.Item value="pizza">Pizza</Radio.Item>
        <Radio.Item value="bagel">Bagel</Radio.Item>
      </Radio.Group>,
    );

    expect(getByRole('radio', { name: 'Bagel' })).not.toBeChecked();
    expect(getByRole('radio', { name: 'Pizza' })).not.toBeChecked();
  });

  it('calls onValueChange prop when Radio button is clicked', async () => {
    const onValueChangeMock = jest.fn();
    const { getByRole, user } = render(
      <Radio.Group onValueChange={onValueChangeMock}>
        <Radio.Item value="pizza">Pizza</Radio.Item>
        <Radio.Item value="bagel">Bagel</Radio.Item>
      </Radio.Group>,
    );

    await user.click(getByRole('radio', { name: 'Pizza' }));

    expect(onValueChangeMock).toHaveBeenCalledWith('pizza');
  });
});
