import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '../../ThemeProvider';
import { darkTheme } from '../../themes';
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
  <ThemeProvider theme={darkTheme}>
    <Select label="Pick Options" placeholder="Your option" {...restProps}>
      {options.map((opt) => (
        <Option key={opt.label} value={opt.value}>
          {opt.label}
        </Option>
      ))}
    </Select>
  </ThemeProvider>
);

const renderComponent = (props: RenderProps = {}) => render(<Component {...props} />);

describe('Select', () => {
  it('should infer the multi prop on the options when set to true on the Select component', async () => {
    // @ts-expect-error We are testing the the inference of the multi prop for a deprecated component
    const { getByRole } = renderComponent({ multi: true });

    await userEvent.click(getByRole('combobox', { name: 'Pick Options' }));

    /**
     * Because we're only testing the visuals here, we're expecting a checkbox div element to be rendered
     * so we're using a snapshot for that.
     */
    expect(getByRole('option', { name: 'Option 1' })).toMatchInlineSnapshot(`
      .c1 {
        border-radius: 4px;
        position: relative;
        z-index: 1;
        overflow: hidden;
        width: 18px;
        height: 18px;
      }

      .c4 {
        font-size: 0.875rem;
        line-height: 1.43;
        color: #ffffff;
      }

      .c0 {
        width: 100%;
        border: none;
        text-align: left;
        outline-offset: -3px;
        border-radius: 4px;
        padding: 8px 16px;
        padding-left: 16px;
        background-color: #212134;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .c0:focus-visible {
        outline: none;
        background-color: #181826;
      }

      .c0:hover {
        background-color: #181826;
      }

      .c0[data-state='checked'] .c3 {
        font-weight: bold;
        color: #7b79ff;
      }

      .c2 {
        border: 1px solid #666687;
        background-color: #212134;
      }

      <div
        aria-checked="false"
        aria-labelledby="radix-:r6:"
        class="c0"
        data-highlighted=""
        data-radix-collection-item=""
        data-state="unchecked"
        role="option"
        tabindex="-1"
      >
        <span
          aria-hidden="true"
        >
          <div
            class="c1 c2"
            overflow="hidden"
          />
        </span>
        <span
          class="c3 c4"
        >
          <span
            id="radix-:r6:"
          >
            Option 1
          </span>
        </span>
      </div>
    `);
  });
});
