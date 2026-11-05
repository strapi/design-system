---
'@strapi/design-system': minor
---

**`/next`**: add `Popover`, `Calendar`, `Combobox` and `DateTimePicker`

Four new components for the `/next` (Tailwind + shadcn) entry point:

- **`Popover`** — a styled wrapper over the `@base-ui` Popover (`Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverClose`). `PopoverContent` forwards the positioning props (`side`, `align`, `sideOffset`, `collisionAvoidance`, …) and defaults to non-modal-friendly layering.
- **`Calendar`** — a controlled month calendar built on `@internationalized/date`. Supports `value`/`onValueChange`, a controlled or uncontrolled visible `month`, `minDate`/`maxDate`, locale-aware weekday order and labels, and arrow-key / Home / End / PageUp / PageDown navigation with a roving tabstop.
- **`Combobox`** — a styled wrapper over the `@base-ui` Combobox (`Combobox`, `ComboboxInput`, `ComboboxTrigger`, `ComboboxClear`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxItemIndicator`, `ComboboxEmpty`, `ComboboxGroup`, `ComboboxGroupLabel`, `ComboboxSeparator`, `ComboboxValue`). A searchable single/multi select; the content matches the anchor width and filters on the input.
- **`DateTimePicker`** — composes `Popover` + `Calendar` + a time field into a single-field control. Shows the selected value through `Intl.DateTimeFormat`, exposes `minDate`/`maxDate`, `disabled`, `locale`, `formatOptions`, a `clearLabel`, and a `children` slot rendered under the time field (for app-specific extras such as a timezone selector built on `Combobox`).

Additive — no existing `/next` exports change. The components are self-contained (inline SVG icons, no `@strapi/icons` coupling).
