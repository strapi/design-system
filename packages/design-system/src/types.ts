import * as React from 'react';

import { DefaultTheme } from 'styled-components';

/**
 * A type that represents a CSS property that can be either a value from the theme or a CSS property.
 */
type DefaultThemeOrCSSProp<T extends keyof DefaultTheme, K extends keyof React.CSSProperties> =
  | keyof DefaultTheme[T]
  | React.CSSProperties[K];

/**
 * Transforms a props object into a new object where each key is prefixed with a `$`.
 * This is useful for passing transient props to styled components that are not prefixed
 * when passed to the react component.
 */
type PropsToTransientProps<TProps extends Record<string, any>> = {
  [K in keyof TProps as `$${string & K}`]: TProps[K];
};

/**
 * A more precise version of just React.ComponentPropsWithoutRef on its own
 */
type PropsOf<C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
  React.ComponentPropsWithoutRef<C>;

type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  tag?: C;
  as?: never;
  forwardedAs?: never;
};

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
type ExtendableProps<ExtendedProps, OverrideProps> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
type InheritableElementProps<C extends React.ElementType, Props> = ExtendableProps<PropsOf<C>, Props>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
type PolymorphicComponentProps<C extends React.ElementType, Props> = InheritableElementProps<C, Props & AsProp<C>>;

/**
 * Utility type to extract the `ref` prop from a polymorphic component
 */
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

/**
 * A wrapper of `PolymorphicComponentProps` that also includes the `ref`
 * prop for the polymorphic component
 */
type PolymorphicComponentPropsWithRef<C extends React.ElementType, Props> = PolymorphicComponentProps<C, Props> & {
  ref?: PolymorphicRef<C>;
};

export type {
  DefaultThemeOrCSSProp,
  PropsToTransientProps,
  PropsOf,
  AsProp,
  ExtendableProps,
  InheritableElementProps,
  PolymorphicComponentProps,
  PolymorphicRef,
  PolymorphicComponentPropsWithRef,
};
