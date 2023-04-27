import { MultiSelect, MultiSelectProps } from './MultiSelect';
import { SingleSelect, SingleSelectProps } from './SingleSelect';

export type SelectProps =
  | (SingleSelectProps & { multi?: never; withTags?: never })
  | (MultiSelectProps & { multi: true });

/**
 * @preserve
 * @deprecated You should import the specific type of select you want to render
 *
 * e.g. `import { MultiSelect } from '@strapi/design-system';`
 */
export const Select = (props: SelectProps) =>
  props.multi || props.withTags ? <MultiSelect {...props} /> : <SingleSelect {...props} />;
