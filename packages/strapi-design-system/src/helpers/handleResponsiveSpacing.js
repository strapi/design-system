const handleResponsiveSpacing = (position, value, theme) => {
  if (value === undefined) return undefined;

  if (Array.isArray(value)) {
    const [desktopPadding, tabletPadding, mobilePadding] = value;

    let spaces = `${position}: ${theme.spaces[desktopPadding]};`;

    if (tabletPadding !== undefined) {
      spaces += `${theme.mediaQueries.tablet}{
          ${position}: ${theme.spaces[tabletPadding]};
        }`;
    }

    if (mobilePadding !== undefined) {
      spaces += `${theme.mediaQueries.mobile}{
          ${position}: ${theme.spaces[mobilePadding]};
        }`;
    }

    return spaces;
  }

  // Fallback to the passed value when necessary
  const realValue = theme.spaces[value] || value;
  return `${position}: ${realValue};`;
};

export default handleResponsiveSpacing;
