---
'@strapi/design-system': minor
---

**`/next`**: add `SegmentedControl`

A segmented control for the `/next` (Tailwind + shadcn) entry point (`SegmentedControl`, `SegmentedControlItem`).

It is a radio group under the hood (`@base-ui` RadioGroup + Radio), not a toggle group: exactly one item is always selected and it can never be deselected to an empty state — the right semantics for a small, always-answered choice (e.g. publish / unpublish). Rendered as a neutral "pill" track whose selected segment lifts onto a surface. The root takes the usual RadioGroup props (`value`, `defaultValue`, `onValueChange`, `name`, `disabled`); each item takes a `value`.

Additive — no existing `/next` exports change.
