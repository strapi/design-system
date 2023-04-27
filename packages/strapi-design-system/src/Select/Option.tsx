import { MultiSelectOption, MultiSelectOptionProps } from './MultiSelect';
import { SingleSelectOption, SingleSelectOptionProps } from './SingleSelect';

export type OptionProps = (SingleSelectOptionProps & { multi?: never }) | (MultiSelectOptionProps & { multi: true });

/**
 * @preserve
 * @deprecated You should import the specific type of option you want to render,
 * e.g. `import { MultiSelectOption } from '@strapi/design-system';`
 */
export const Option = ({ multi, ...restProps }: OptionProps) =>
  multi ? <MultiSelectOption {...restProps} /> : <SingleSelectOption {...restProps} />;
