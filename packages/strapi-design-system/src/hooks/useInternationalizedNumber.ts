import { useRef } from 'react';

import { NumberFormatter, NumberParser } from '@internationalized/number';

import { getDefaultLocale } from '../helpers/getDefaultLocale';

export const useInternationalizedNumber = (locale, { parserParams, formatParams }) => {
  // define the locale or use the default one
  const finalLocale = locale || getDefaultLocale();
  const numberParserRef = useRef(new NumberParser(finalLocale, parserParams));
  const numberFormaterRef = useRef(new NumberFormatter(finalLocale, formatParams));

  return {
    parser: numberParserRef.current,
    formatter: numberFormaterRef.current,
  };
};
