# The `/next` tree

Experimental Strapi Design System using Tailwind CSS and shadcn (style `base-vega`, built on Base UI `@base-ui/react`, not Radix).

## Important rules to keep in mind

### Legacy look via legacy tokens

The components use the shadcn API (compound parts, `className`, `cn()`, `cva` variants) but keep the look of the legacy components: sizes, paddings, colours, borders, radii, focus rings, hover and disabled states.

Style them with the legacy tokens that `styles.css` and `theme.css` define, for example `bg-neutral-0`, `text-neutral-800`, `border-neutral-200`, `bg-button-primary-600`, `shadow-filter` and the `small:`, `medium:` and `large:` breakpoints. Do not use the stock shadcn tokens (`bg-primary`, `text-muted-foreground`, `ring`, ...) or the Tailwind palette. Each legacy colour token already has a dark value, so a component rarely needs a `dark:` variant.

The root font size is 10px, so `1rem` is 10px and a spacing step is 4px.

### Every shadcn component gets a `React.forwardRef` wrapper

The shadcn registry output assumes React 19, where `ref` is a plain prop. On React 18 a function component does not receive `ref` in its props, so a component without the wrapper loses its ref. Add the wrapper to each component that the CLI generates. Remove the wrappers if the package moves to React 19.

### Icons come from `@strapi/icons`

Replace any `lucide-react` import that the shadcn CLI generates. A `@strapi/icons` icon works without `DesignSystemProvider`: with no theme, its `fill` and `stroke` pass through as is, so colour it with a class (`text-neutral-500`) rather than a theme token name.

### Controls read the closest `Field`

A control takes its id, name, required flag, error and description from the closest `Field` through `useFieldControl`, like the legacy components. A composite control wires its first control to the `Field` and wraps the others in `FieldReset` (see `DateTimePicker`).

### The locale comes from `LocaleProvider`

`LocaleProvider` replaces the `locale` prop of the legacy `DesignSystemProvider`. Read it with `useLocale(localeProp)`, which falls back to the browser language. Never read `navigator.language` in a component.

### No legacy re-exports

`index.ts` exports the new components, hooks and helpers only. Every public component is exported from `components/ui/index.ts`.

### Stories

Stories live in `docs/stories/06-next` and import from `@strapi/design-system/next`. Storybook compiles only the Tailwind classes found in `src/next`, so a story must not rely on a class that only the story file uses.

## Components

| Legacy                                 | `/next`                                                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Button                                 | `Button`                                                                                                |
| IconButton, IconButtonGroup            | `IconButton`, `IconButtonGroup`                                                                         |
| LinkButton, TextButton, Link, BaseLink | `LinkButton`, `TextButton`, `Link`, `BaseLink`                                                          |
| Typography                             | `Typography`                                                                                            |
| Field                                  | `Field`, `FieldLabel`, `FieldHint`, `FieldError`, `FieldAction`, `useField`, `useFieldControl`, `Label` |
| TextInput                              | `Input`, `InputGroup` and its parts                                                                     |
| Textarea, NumberInput, JSONInput       | `Textarea`, `NumberInput`, `JSONInput`                                                                  |
| Searchbar, SearchForm                  | `Searchbar`, `SearchForm`                                                                               |
| Checkbox, Radio, Toggle, Switch        | `Checkbox`, `RadioGroup` + `RadioGroupItem`, `Toggle`, `Switch`                                         |
| SingleSelect, MultiSelect              | `Select` and its parts                                                                                  |
| Combobox                               | `Combobox`, `ComboboxOption`                                                                            |
| DatePicker, TimePicker, DateTimePicker | `Calendar`, `DatePicker`, `TimePicker`, `DateTimePicker`                                                |
| Dialog                                 | `AlertDialog` and its parts                                                                             |
| Modal                                  | `Dialog` and its parts                                                                                  |
| Popover                                | `Popover` and its parts, `PopoverScrollArea`                                                            |
| Tooltip                                | `SimpleTooltip`, `Tooltip` and its parts                                                                |
| SimpleMenu, Menu                       | `SimpleMenu`, `DropdownMenu` and its parts                                                              |
| Table, RawTable                        | `Table` and its parts, `RawTable` and its parts                                                         |
| Pagination                             | `Pagination` and its parts, `usePagination`                                                             |
| Badge, Status, Tag                     | `Badge`, `Status`, `Tag`                                                                                |
| Avatar                                 | `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarGroup`                                                |
| Card                                   | `Card` and its parts                                                                                    |
| Alert                                  | `Alert` and its parts                                                                                   |
| Loader                                 | `Loader` (and `Spinner` for inline use)                                                                 |
| ProgressBar                            | `Progress` and its parts                                                                                |
| EmptyStateLayout                       | `Empty` and its parts                                                                                   |
| Accordion, Tabs                        | `Accordion` and its parts, `Tabs` and its parts                                                         |
| Breadcrumbs                            | `Breadcrumb` and its parts, `BreadcrumbMenu`                                                            |
| SubNav                                 | `SubNav` and its parts                                                                                  |
| CarouselInput                          | `Carousel`, `CarouselSlide`, `CarouselImage`, `CarouselActions`, `CarouselInput`                        |
| Main                                   | `Main`, `SkipToContent`                                                                                 |
| Divider                                | `Separator`                                                                                             |
| Portal, VisuallyHidden, AccessibleIcon | `Portal`, `VisuallyHidden`, `AccessibleIcon`                                                            |
| FocusTrap, DismissibleLayer            | `FocusTrap`, `DismissibleLayer`                                                                         |
| KeyboardNavigable, ScrollArea          | `KeyboardNavigable`, `ScrollArea`, `ScrollBar`                                                          |
| LiveRegions, useNotifyAT               | `LiveRegions`, `useNotifyAT`                                                                            |
| Hooks                                  | `useComposedRefs`, `composeRefs`, `useCallbackRef`, `useCollator`, `useFilter`, `useDateFormatter`      |
| Box, Flex, Grid                        | Not recreated: use Tailwind classes                                                                     |
