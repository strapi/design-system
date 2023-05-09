import React, { useEffect, useState } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { parse } from 'qs';
import { DesignSystemProvider, Box, lightTheme, darkTheme } from '@strapi/design-system';

const themeQueryURL = parse(document.location.search).theme;

const Theme = ({ children }) => {
  const isDarkAddon = useDarkMode();
  const [isDark, setIsDark] = useState(themeQueryURL || isDarkAddon);

  useEffect(() => {
    if (!themeQueryURL && isDarkAddon !== isDark) {
      setIsDark(isDarkAddon);
    }
  }, [isDarkAddon, isDark]);

  return (
    <DesignSystemProvider locale="en-GB" theme={isDark ? darkTheme : lightTheme}>
      <Box padding={2} background="neutral0">
        {children}
      </Box>
    </DesignSystemProvider>
  );
};

export default Theme;
