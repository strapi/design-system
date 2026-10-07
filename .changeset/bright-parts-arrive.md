---
'@strapi/design-system': minor
---

Add the legacy components to `@strapi/design-system/next`. They are built on Base UI and Tailwind
with the shadcn API (compound parts, `className`, `cva` variants), and they keep the legacy look
through the legacy colour tokens, in light and dark mode.

- Actions and text: `Button`, `IconButton`, `IconButtonGroup`, `LinkButton`, `TextButton`, `Link`,
  `BaseLink`, `Typography`.
- Forms: `Field` (`FieldLabel`, `FieldHint`, `FieldError`, `FieldAction`, `useField`), `Input`,
  `InputGroup`, `Textarea`, `NumberInput`, `Searchbar`, `SearchForm`, `JSONInput`, `Checkbox`,
  `RadioGroup`, `Toggle`, `Switch`, `Label`.
- Pickers: `Select` (single and multiple, groups), `Combobox` (creatable, async, load more),
  `Calendar`, `DatePicker`, `TimePicker`, `DateTimePicker`.
- Overlays: `AlertDialog` (the legacy `Dialog`), `Dialog` (the legacy `Modal`), `Popover`,
  `Tooltip`, `SimpleTooltip`, `DropdownMenu`, `SimpleMenu`, `Portal`.
- Data display: `Table`, `RawTable`, `Pagination`, `Badge`, `Status`, `Tag`, `Avatar`,
  `AvatarGroup`, `Card`.
- Feedback and navigation: `Alert`, `Loader`, `Spinner`, `Progress` (the legacy `ProgressBar`),
  `Empty` (the legacy `EmptyStateLayout`), `Accordion`, `Tabs`, `Breadcrumb`, `SubNav`,
  `Carousel` and `CarouselInput`, `Main`, `SkipToContent`, `Separator` (the legacy `Divider`),
  `Collapsible`.
- Utilities: `VisuallyHidden`, `AccessibleIcon`, `FocusTrap`, `DismissibleLayer`,
  `KeyboardNavigable`, `ScrollArea`, `LiveRegions`, `useNotifyAT`, and the hooks
  `useComposedRefs`, `useCallbackRef`, `useCollator`, `useFilter` and `useDateFormatter`.

Box, Flex and Grid are not recreated: use Tailwind classes.

The `/next` `Button` changes. Its variants are now the legacy ones: `default`, `secondary`,
`tertiary`, `success`, `success-light`, `danger`, `danger-light` and `ghost`. The shadcn `outline`,
`destructive` and `link` variants are removed. Its sizes are now `S`, `M` (the default) and `L`,
and the shadcn `xs`, `sm`, `lg`, `default` and `icon*` sizes are removed. Use `IconButton` for a
button with only an icon. `Button` also takes `loading`, `startIcon`, `endIcon` and `fullWidth`.

`cn` now treats `shadow-filter`, `shadow-popup`, `shadow-table`, `shadow-focus`,
`shadow-focus-inset` and `text-2xs` as a shadow and a font size, so a `className` such as
`shadow-none` overrides them.

The new components need no provider. `LocaleProvider` sets the locale of the pickers, the number
input and the calendar, in place of the `locale` prop of `DesignSystemProvider`; without it they use
the browser language.

Combobox, Select, DatePicker and DateTimePicker read the closest `Field` for their id, name, required
flag, error and description, like the legacy ones. `FieldReset` hides a `Field` from the controls
below it, for composite controls.
