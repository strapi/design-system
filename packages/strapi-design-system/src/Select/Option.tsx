import { MultiSelectOption, MultiSelectOptionProps } from './MultiSelect';
import { SingleOption, SingleOptionProps } from './SingleSelect';

export type OptionProps = (SingleOptionProps & { multi?: never }) | (MultiSelectOptionProps & { multi: true });

export const Option = ({ multi, ...restProps }: OptionProps) =>
  multi ? <MultiSelectOption {...restProps} /> : <SingleOption {...restProps} />;
