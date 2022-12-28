import PropTypes from 'prop-types';

/**
 * @type {(otherProps: string[]) => (props: Record<string, unknown>, propName: string) => Error | undefined}
 */

export const throwPropErrorIfNoneAreDefined = (otherProps, propType) => (props, propName, componentName) => {
  if (!props[propName] && otherProps.every((otherProp) => !props[otherProp])) {
    return new Error(`One of the following props is required: ${propName}, ${otherProps.join(', ')}`);
  }

  return PropTypes.checkPropTypes({ [propName]: PropTypes[propType] }, props, 'prop', componentName);
};

/**
 * @type {(otherProps: any{}) => (props: Record<string, unknown>, propName: string) => Error | undefined}
 */

export const throwPropErrorRequiredIf = (otherProps, propType) => (props, propName, componentName) => {
  if (props[propName] === undefined && Object.entries(otherProps).every(([key, value]) => props[key] === value)) {
    return new Error(`${propName} is required`);
  }

  return PropTypes.checkPropTypes({ [propName]: PropTypes[propType] }, props, 'prop', componentName);
};
