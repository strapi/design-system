import { useRef, useEffect } from 'react';

import { NumberFormatter, NumberParser } from '@internationalized/number';

/**
 * @description Hook that gives us the correct parser and formatter for numbers based on the Locale and the different config options of the Intl.NumberFormat.
 * The config options for the parserParams are for example:
 *   - `useInternationalizedNumber( "en-GB", { parserParams: { style: 'decimal' }, ...)`
 *   - `useInternationalizedNumber( "en-GB", { parserParams: { style: 'percent' }, ...)`
 *   - `useInternationalizedNumber( "en-GB", { parserParams: { style: 'unit', unit: 'inch' }, ...)`
 * The config options for the formatParams are for example:
 *   - `useInternationalizedNumber( "en-GB", ..., formatParams: { style: 'currency', currency: 'EUR' })`
 *   - `useInternationalizedNumber( "en-GB", ..., formatParams: { maximumSignificantDigits: 3 })`
 * @export
 * @param locale It is the string representing the locale to use to parse or format numbers, ex: "en-GB", "en-US", "fr-FR"
 * @param parserParams It is a key property inside the second argument that contains all the possible configurations for the parser
 * @param formatParams It is a key property inside the second argument that contains all the possible configurations for the formatter
 * @returns an object containing the parser and the formatter
 */
export const useInternationalizedNumber = (locale, { parserParams, formatParams }) => {
  // define the locale or use the default one
  const numberParserRef = useRef(new NumberParser(locale, parserParams));
  const numberFormatterRef = useRef(new NumberFormatter(locale, formatParams));

  useEffect(() => {
    numberParserRef.current = new NumberParser(locale, parserParams);
    numberFormatterRef.current = new NumberFormatter(locale, formatParams);
  }, [locale, parserParams, formatParams]);

  return {
    parser: numberParserRef.current,
    formatter: numberFormatterRef.current,
  };
};
