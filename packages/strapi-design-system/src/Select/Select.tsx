import { MultiSelect, MultiSelectProps } from './MultiSelect';
import { SingleSelect, SingleSelectProps } from './SingleSelect';

type SelectProps = (SingleSelectProps & { multi?: never; withTags?: never }) | (MultiSelectProps & { multi: true });

export const Select = (props: SelectProps) =>
  props.multi || props.withTags ? <MultiSelect {...props} /> : <SingleSelect {...props} />;
