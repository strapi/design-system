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

Replaced with `BlocksField` and exported from `@strapi/icons/symbols`.

#### Boolean

Replaced with `BooleanField` and exported from `@strapi/icons/symbols`

#### Brush

Replaced with `PaintBrush`

#### CarretDown

Replaced with `CaretDown`

#### CarretUp

Replaced with `CaretUp`

#### CodeSquare

Now exported from `@strapi/icons/symbols`

#### Component

Replaced with `ComponentField` and exported from `@strapi/icons/symbols`

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

#### Discord

Now exported from `@strapi/icons/symbols`

#### Discourse

Now exported from `@strapi/icons/symbols`

#### Doctor

Replaced with `Stethoscope`

#### Dot

Removed.

#### DynamicZone

Replaced with `DynamicZoneField` and exported from `@strapi/icons/symbols`

#### Email

Replaced with `EmailField` and exported from `@strapi/icons/symbols`

#### EmptyData

Now exported from `@strapi/icons/symbols`

#### EmptyDocuments

Now exported from `@strapi/icons/symbols`

#### EmptyPermissions

Now exported from `@strapi/icons/symbols`

#### EmptyPictures

Now exported from `@strapi/icons/symbols`

#### Enumeration

Replaced with `EnumerationField` and exported from `@strapi/icons/symbols`

#### Envelop

Replaced with `Mail`

#### Equalizer

Replaced with `SlidersHorizontal`

#### ExclamationMarkCircle

Replaced with `WarningCircle`

#### Exit

Replaced with `SignOut`

#### Facebook

Now exported from `@strapi/icons/symbols`

#### FeatherSquare

Now exported from `@strapi/icons/symbols`

#### Gate

Replaced with `CastleTurret`

#### Github

Now exported from `@strapi/icons/symbols`

#### GlassesSquare

Now exported from `@strapi/icons/symbols`

#### Grid

Replaced with `GridFour`

#### Headphone

Replaced with `Headphones`

#### History

Replaced with `ClockCounterClockwise`

#### InformationSquare

Now exported from `@strapi/icons/symbols`

#### Json

Replaced with `JsonField` and exported from `@strapi/icons/symbols`

#### Landscape

Replaced with `Images`

#### LandscapeSmall

Replaced with `Images`

#### Layer

Replaced with `ListPlus`

#### LinkSmall

Replaced with `Link`

#### Media

Replaced with `MediaField` and exported from `@strapi/icons/symbols`

#### Medium

Now exported from `@strapi/icons/symbols`

#### MenuBurger

Replaced with `List`

#### MinusOutlined

Replaced with `MinusCircle`

#### Music

Replaced with `MusicNotes`

#### Number

Replaced with `NumberField` and exported from `@strapi/icons/symbols`

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

#### PlaySquare

Now exported from `@strapi/icons/symbols`

#### Puzzle

Replaced with `PuzzlePiece`

#### Quote

Replaced with `Quotes`

#### QuoteClosed

Replaced with `Quotes`

#### Reddit

Now exported from `@strapi/icons/symbols`

#### Refresh

Replaced with `ArrowClockwise`

#### Relation

Replaced with `RelationField` and exported from `@strapi/icons/symbols`

#### Repeat

Removed.

#### RichText

Replaced with `RichTextField` and exported from `@strapi/icons/symbols`

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

#### Strapi

Now exported from `@strapi/icons/symbols`

#### Text

Replace with `TextField` and exported from `@strapi/icons/symbols`

#### Twitter

Replaced with `X` and exported from `@strapi/icons/symbols`

#### Uid

Replaced with `UidField` and exported from `@strapi/icons/symbols`

#### Write

Replaced with `Feather`

## Icon has been removed

The `Icon` component has been removed. It's primary function was to allow you to apply theme colors to icons, this is now doable with the actual icon:

```ts
// before
<Icon as={Plus} color="primary700" />

// after
<Plus fill="primary700" />
```
