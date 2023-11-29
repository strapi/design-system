import { render } from '@test/utils';

import { Option } from '../Option';
import { Select } from '../Select';

interface RenderProps {
  options?: Array<{ value: string; label: string }>;
}

const defaultOpts = [
  { value: 'Option 1', label: 'Option 1' },
  { value: 'Option 2', label: 'Option 2' },
  { value: 'Option 3', label: 'Option 3' },
];

const Component = ({ options = defaultOpts, ...restProps }: RenderProps) => (
  <Select label="Pick Options" placeholder="Your option" {...restProps}>
    {options.map((opt) => (
      <Option key={opt.label} value={opt.value}>
        {opt.label}
      </Option>
    ))}
  </Select>
);

const renderComponent = (props: RenderProps = {}) => render(<Component {...props} />);

describe('Select', () => {
  it('should infer the multi prop on the options when set to true on the Select component', async () => {
    // @ts-expect-error We are testing the the inference of the multi prop for a deprecated component
    const { getByRole, user } = renderComponent({ multi: true });

    await user.click(getByRole('combobox', { name: 'Pick Options' }));

    /**
     * Because we're only testing the visuals here, we're expecting a checkbox div element to be rendered
     * so we're using a snapshot for that.
     */
    expect(getByRole('option', { name: 'Option 1' })).toMatchSnapshot();
  });
});
