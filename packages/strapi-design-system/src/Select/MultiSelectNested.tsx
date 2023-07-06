import styled from 'styled-components';

import {
  MultiSelect,
  MultiSelectGroup,
  MultiSelectGroupProps,
  MultiSelectOption,
  MultiSelectOptionProps,
  MultiSelectProps,
} from './MultiSelect';

interface MulitSelectNestedOption extends Omit<MultiSelectOptionProps, 'children' | 'value'> {
  value: string | number;
  label: string;
}

interface MulitSelectNestedGroup extends Omit<MultiSelectGroupProps, 'children'> {
  children: Array<MulitSelectNestedOption>;
}

export type MultiSelectNestedProps = MultiSelectProps & {
  options: Array<MulitSelectNestedOption | MulitSelectNestedGroup>;
};

export const MultiSelectNested = ({ options, ...props }: MultiSelectNestedProps) => {
  return (
    <MultiSelect {...props}>
      {options.map((opt) => {
        if ('children' in opt) {
          return (
            <MultiSelectGroup
              key={opt.label}
              label={opt.label}
              values={opt.children.map((child) => child.value.toString())}
            >
              {opt.children.map((child) => (
                <NestedOption key={child.value} value={child.value}>
                  {child.label}
                </NestedOption>
              ))}
            </MultiSelectGroup>
          );
        }

        return (
          <MultiSelectOption key={opt.value} value={opt.value}>
            {opt.label}
          </MultiSelectOption>
        );
      })}
    </MultiSelect>
  );
};

const NestedOption = styled(MultiSelectOption)`
  padding-left: ${({ theme }) => theme.spaces[7]};
`;
