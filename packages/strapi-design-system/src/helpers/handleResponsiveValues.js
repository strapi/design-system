/* eslint-disable consistent-return */
const handleResponsiveValues = (property, value, theme) => {
  let transformedArray = value;

  if (!Array.isArray(value) && typeof value === 'object') {
    transformedArray = [value?.desktop, value?.tablet, value?.mobile];
  }

  if (transformedArray === undefined) return undefined;

  if (Array.isArray(transformedArray)) {
    const [desktopValue, tabletValue, mobileValue] = transformedArray;

    let spaces = `${property}: ${theme.spaces[desktopValue]};`;

    if (tabletValue !== undefined) {
      spaces += `${theme.mediaQueries.tablet}{
          ${property}: ${theme.spaces[tabletValue]};
        }`;
    }

    if (mobileValue !== undefined) {
      spaces += `${theme.mediaQueries.mobile}{
          ${property}: ${theme.spaces[mobileValue]};
        }`;
    }

    return spaces;
  }

  // Fallback to the passed transformedArray when necessary
  const realValue = theme.spaces[transformedArray] || transformedArray;

  return `${property}: ${realValue};`;
};

export default handleResponsiveValues;
