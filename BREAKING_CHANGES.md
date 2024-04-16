# Breaking Changes Migration guide

## What is this?

This is a living document of all the breaking changes in v2 of the design system. If you've added a breaking change, you'll be expected to update this document accordingly.

## Changelog

### Remove direct imports

Users can no longer `import { Combobox } from '@strapi/design-system/Combobox'`, instead they should import _all_ things from the root of the project.

### Published types

`@strapi/design-system` now comes with typescript definitions. This means you can remove any overrides you may have. They've been tested against the CMS, if you feel there are mistakes, please open a PR to fix them.

### Change font-size on html,body to 62.5%

The base font-size for the app is now 10px, so 1rem = 10px. This means that users should stop dividing their px values by 16 and instead divide by 10. This will make it easier to convert px to rem.

### Removed deprecated components

The following components have been replaced with their V2 counterpart:

- `Breadcrumbs`
- `Link`
- `LinkButton`
- `MainNav`
- `Pagination`
- `SimpleMenu`
- `SubNav`

The following components have been removed:

#### `Select` / `Option` / `OptGroup` / `SelectList`

These comoponents were deprecated previously. It is recommended to use the new iteration either the `SingleSelect` or `MultiSelect` components to replace them depending on your use case.

#### `Stack`

This was just a wrapped component around `Flex`. You should use `Flex` instead.

#### `ToggleCheckbox`

This is the same component as `ToggleInput` and therefore you should use that instead.

### Icon Updates

Many of the icons have been updated visually, this will effect snapshot tests. The default size is `1.6rem` for an icon, in the Strapi design-system this equates to 16px. We have also ensured that `paths` do not have any `fill` or `stroke` properties set, this allows the icon to be styled with CSS except for specific use cases we don't expect users to encounter. The default `color` is `currentColor` which means it will inherit the color of the parent element. We encourage users to use the `Icon` component to render icons as it gives access to the `theme` object in styled-components.

The following icons have been removed:

#### Apps

Replaced with `GridNine`

#### Attachment

Replaced with `Paperclip`

#### Blocks

Replaced with `BlocksField`

#### Boolean

Replaced with `BooleanField`

#### Brush

Replaced with `PaintBrush`

#### CarretDown

Replaced with `CaretDown`

#### CarretUp

Replaced with `CaretUp`

#### Component

Replaced with `ComponentField`

#### Connector

Replaced with `Faders`

#### Cube

Removed.

#### Cup

Replaced with `Coffee`

#### Dashboard

Replaced with `SquareFour`

#### Date

Replaced with `DateField`

#### Doctor

Replaced with `Stethoscope`

#### Dot

Removed.

#### DynamicZone

Replaced with `DynamicZoneField`

#### Email

Replaced with `EmailField`

#### Enumeration

Replaced with `EnumerationField`

#### Envelop

Replaced with `Mail`

#### Equalizer

Replaced with `SlidersHorizontal`

#### ExclamationMarkCircle

Replaced with `WarningCircle`

#### Exit

Replaced with `SignOut`

#### Gate

Replaced with `CastleTurret`

#### Grid

Replaced with `GridFour`

#### Headphone

Replaced with `Headphones`

#### History

Replaced with `ClockCounterClockwise`

#### Json

Replaced with `JsonField`

#### Landscape

Replaced with `Images`

#### LandscapeSmall

Replaced with `Images`

#### Layer

Replaced with `ListPlus`

#### LinkSmall

Replaced with `Link`

#### Media

Replaced with `MediaField`

#### MenuBurger

Replaced with `List`

#### MinusOutlined

Replaced with `MinusCircle`

#### Music

Replaced with `MusicNotes`

#### Number

Replaced with `NumberField`

#### OnholdCarretDown

Replaced with `CaretDown`

#### OnholdCarretUp

Replaced with `CaretUp`

#### Paint

Replaced with `PaintBrush`

#### Password

Replaced with `PasswordField`

#### Picture

Replaced with `Image`

#### PicturePlus

Replaced with `PlusCircle`

#### Puzzle

Replaced with `PuzzlePiece`

#### Quote

Replaced with `Quotes`

#### QuoteClosed

Replaced with `Quotes`

#### Refresh

Replaced with `ArrowClockwise`

#### Relation

Replaced with `RelationField`

#### Repeat

Removed.

#### RichText

Replaced with `RichTextField`

#### Rotate

Replaced with `ArrowsCounterClockwise`

#### SearchIcon

Removed, use `Search` instead.

#### Seed

Replaced with `Plant`

#### Slideshow

Replaced with `PresentationChart`

#### Spark

Replaced with `Sparkle`

#### Spinner

Replaced with `Loader`

#### Text

Replace with `TextField`

#### Twitter

Replaced with `X`

#### Uid

Replaced with `UidField`

#### Write

Replaced with `Feather`
