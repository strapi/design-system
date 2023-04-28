import * as React from 'react';

import { MultiSelect, MultiSelectProps } from './MultiSelect';
import { SingleSelect, SingleSelectProps } from './SingleSelect';

export type SelectProps =
  | (SingleSelectProps & { multi?: never; withTags?: never })
  | (MultiSelectProps & { multi: true });

const SelectContext = React.createContext<{ multi: boolean }>({ multi: false });

export const useSelectContext = () => React.useContext(SelectContext);

/**
 * @preserve
 * @deprecated You should import the specific type of select you want to render
 *
 * e.g. `import { MultiSelect } from '@strapi/design-system';`
 */
export const Select = (props: SelectProps) => {
  const contextValue = React.useMemo(
    () => ({ multi: Boolean(props.multi || props.withTags) }),
    [props.multi, props.withTags],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      {props.multi || props.withTags ? <MultiSelect {...props} /> : <SingleSelect {...props} />}
    </SelectContext.Provider>
  );
};
