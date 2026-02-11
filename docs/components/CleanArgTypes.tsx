import { PureArgsTable, type SortType, useOf } from '@storybook/addon-docs/blocks';
import { filterArgTypes, type PropDescriptor } from 'storybook/preview-api';

type CleanArgTypesProps = {
  of?: unknown;
  include?: PropDescriptor;
  exclude?: PropDescriptor;
  sort?: SortType;
  compact?: boolean;
  initialExpandedArgs?: boolean;
  useArgsAsDefaults?: boolean;
};

type ArgTypeRow = {
  description?: string;
  type?: { required?: boolean };
  table?: {
    defaultValue?: { summary?: string } | string;
    type?: unknown;
    jsDocTags?: unknown;
  };
  defaultValue?: unknown;
  [key: string]: unknown;
};

type ArgTypes = Record<string, ArgTypeRow>;
type ArgTypesMap = Record<string, unknown>;
type ArgsTableRows = Parameters<typeof PureArgsTable>[0] extends { rows: infer R } ? R : never;

type ControlsParameters = {
  include?: PropDescriptor;
  exclude?: PropDescriptor;
  sort?: SortType;
};

type DocsParameters = {
  controls?: ControlsParameters;
  extractArgTypes?: (component: unknown) => ArgTypes;
};

type StoryParameters = {
  docs?: DocsParameters;
};

type ProjectAnnotations = {
  parameters?: StoryParameters;
  args?: Record<string, unknown>;
};

type PreparedMeta = {
  parameters?: StoryParameters;
  component?: unknown;
  args?: Record<string, unknown>;
};

type ResolvedComponent = {
  type: 'component';
  component: unknown;
  projectAnnotations?: ProjectAnnotations;
};

type ResolvedMeta = {
  type: 'meta';
  preparedMeta?: PreparedMeta;
};

type ResolvedStory = {
  type: 'story';
  story?: {
    parameters?: StoryParameters;
    argTypes?: ArgTypes;
    args?: Record<string, unknown>;
    initialArgs?: Record<string, unknown>;
  };
};

const formatDefaultValue = (value: unknown) => {
  if (value === null) return 'null';
  if (value === undefined) return undefined;
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return String(value);
  if (typeof value === 'function') return 'fn';
  if (typeof value === 'symbol') return 'symbol';
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

const applyDefaultsFromArgs = (rows: ArgTypesMap, args?: Record<string, unknown>): ArgTypesMap => {
  if (!args) return rows;

  return Object.fromEntries(
    Object.entries(rows).map(([key, row]) => {
      const typedRow = row as ArgTypeRow;
      const hasDefault = typedRow?.table?.defaultValue != null || typedRow?.defaultValue != null;
      if (hasDefault || !(key in args)) return [key, row];

      const summary = formatDefaultValue(args[key]);
      if (summary === undefined) return [key, row];

      return [
        key,
        {
          ...typedRow,
          table: {
            ...typedRow.table,
            defaultValue: { summary },
          },
        },
      ];
    }),
  ) as ArgTypesMap;
};

const stripTypeSummaries = (rows: ArgTypesMap): ArgTypesMap => {
  return Object.fromEntries(
    Object.entries(rows).map(([key, row]) => {
      const typedRow = row as ArgTypeRow;
      const nextRow: ArgTypeRow = { ...typedRow };

      if (nextRow.type) {
        nextRow.type = { required: nextRow.type.required };
      }

      if (nextRow.table) {
        nextRow.table = { ...nextRow.table, type: undefined };
      }

      return [key, nextRow];
    }),
  ) as ArgTypesMap;
};

const applyDescriptionEnhancements = (rows: ArgTypesMap): ArgTypesMap => {
  return Object.fromEntries(
    Object.entries(rows).map(([key, row]) => {
      const typedRow = row as ArgTypeRow;
      if (!typedRow.description) return [key, row];
      return [
        key,
        {
          ...typedRow,
          description: typedRow.description,
        },
      ];
    }),
  ) as ArgTypesMap;
};

const CleanArgTypes = ({
  of,
  include,
  exclude,
  sort,
  compact,
  initialExpandedArgs,
  useArgsAsDefaults = true,
}: CleanArgTypesProps) => {
  const resolved = useOf(of || 'component', ['component', 'meta', 'story']) as
    | ResolvedComponent
    | ResolvedMeta
    | ResolvedStory;

  let rows: ArgTypesMap | undefined;
  let parameters: StoryParameters | undefined;
  let defaultArgs: Record<string, unknown> | undefined;
  if (resolved.type === 'component') {
    const { component, projectAnnotations } = resolved;
    parameters = projectAnnotations?.parameters;
    defaultArgs = projectAnnotations?.args;
    rows = parameters?.docs?.extractArgTypes?.(component);
  } else if (resolved.type === 'meta') {
    const { preparedMeta } = resolved;
    parameters = preparedMeta?.parameters;
    const component = preparedMeta?.component;
    defaultArgs = preparedMeta?.args;
    rows = component ? parameters?.docs?.extractArgTypes?.(component) : undefined;
  } else if (resolved.type === 'story') {
    const { story } = resolved;
    parameters = story?.parameters;
    defaultArgs = story?.initialArgs ?? story?.args;
    rows = story?.argTypes;
  }

  if (!rows) return null;

  const controlsParameters = parameters?.docs?.controls || {};
  const filteredRows = filterArgTypes(
    rows as unknown as Parameters<typeof filterArgTypes>[0],
    include ?? controlsParameters.include,
    exclude ?? controlsParameters.exclude,
  ) as ArgTypesMap;
  const cleanedRows = stripTypeSummaries(filteredRows);
  const rowsWithDefaults = useArgsAsDefaults ? applyDefaultsFromArgs(cleanedRows, defaultArgs) : cleanedRows;
  const rowsWithDescriptions = applyDescriptionEnhancements(rowsWithDefaults);
  const sortValue = sort ?? controlsParameters.sort;

  return (
    <PureArgsTable
      rows={rowsWithDescriptions as unknown as ArgsTableRows}
      sort={sortValue}
      compact={compact}
      initialExpandedArgs={initialExpandedArgs}
    />
  );
};

export { CleanArgTypes };
