import React, { useState, useEffect } from 'react';
import { parse } from 'qs';
import addons from '@storybook/addons';

const channel = addons.getChannel()

export const useThemeType = () => {
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    channel.on('DARK_MODE', setDark)
    return () => channel.off('DARK_MODE', setDark)
  }, [channel, setDark]);

  useEffect(() => {
    const themeQueryURL = parse(document.location.search).theme;

    if(themeQueryURL === 'dark') {
      setDark(true);
    };
  }, [isDark]);

  const paletteType = isDark ? 'dark' : 'light';

  return paletteType;
}