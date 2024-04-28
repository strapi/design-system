import {
  lightTheme,
  Box,
  Flex,
  Grid,
  Typography,
  useCollator,
  useDesignSystem,
  darkTheme,
} from '@strapi/design-system';
import { useDarkMode } from 'storybook-dark-mode';
import tinycolor2 from 'tinycolor2';

import { H2 } from './Typography';

const COLOR_CARD_NAMES = ['Neutral', 'Primary', 'Secondary', 'Alternative', 'Success', 'Warning', 'Danger'];

/* -------------------------------------------------------------------------------------------------
 * ColorCards
 * -----------------------------------------------------------------------------------------------*/

const ColorCards = () => {
  const allColors = lightTheme.colors;

  const { locale } = useDesignSystem('ColorCards');

  const { compare } = useCollator(locale);

  return (
    <Flex tag="article" alignItems="stretch" direction="column">
      {COLOR_CARD_NAMES.map((colorName) => {
        const colorKeys = Object.keys(allColors).filter((colorKey) => colorKey.startsWith(colorName.toLowerCase()));

        return (
          <Box key={colorName} tag="section">
            <H2>{`${colorName} colors`}</H2>
            <Grid tag="ol" gap={6} gridCols={3}>
              {colorKeys
                .toSorted((a, b) => compare(a, b))
                .map((key) => (
                  <li key={key}>
                    <Card colorKey={key} colorName={colorName} colorShade={key.split(colorName.toLowerCase())[1]} />
                  </li>
                ))}
            </Grid>
          </Box>
        );
      })}
    </Flex>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ColorCard
 * -----------------------------------------------------------------------------------------------*/

interface CardProps {
  colorKey: string;
  colorName: string;
  colorShade: string;
}

const Card = ({ colorKey, colorName, colorShade }: CardProps) => {
  const isDark = useDarkMode();

  const colorHex = (isDark ? darkTheme : lightTheme).colors[colorKey];

  if (!colorHex) {
    return null;
  }

  const colorRef = tinycolor2(colorHex);
  const colorRGB = `${colorRef.toRgb().r}, ${colorRef.toRgb().g}, ${colorRef.toRgb().b}`;

  return (
    <Box tag="article" background="neutral100" borderRadius="8px">
      <Flex
        tag="dl"
        alignItems="end"
        direction="row"
        background={colorKey}
        borderRadius="8px 8px 0 0"
        padding={4}
        minHeight="104px"
        aria-label={`Contrast accessibility checks for ${colorName} ${colorShade}`}
        gap={2}
      >
        <ContrastInfo backgroundColor={colorHex} />
        <ContrastInfo backgroundColor={colorHex} isSmall />
        <ContrastInfo backgroundColor={colorHex} isLighter />
        <ContrastInfo backgroundColor={colorHex} isLighter isSmall />
      </Flex>
      <Grid
        tag="dl"
        aria-label={`Table properties for ${colorName} ${colorShade}`}
        gap={2}
        gridCols={2}
        padding={4}
        minHeight="104px"
      >
        {[
          {
            label: 'Name',
            content: `${colorName} ${colorShade}`,
          },
          {
            label: 'Key',
            content: colorKey,
          },
          {
            label: 'RGB',
            content: colorRGB,
          },
          {
            label: 'Hexa',
            content: colorHex,
          },
        ].map((props) => (
          <Box key={props.label}>
            <Typography tag="dt" variant="sigma">
              {props.label}
            </Typography>
            <Typography tag="dd" variant="pi">
              {props.content}
            </Typography>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ContrastInfo
 * -----------------------------------------------------------------------------------------------*/

const ContrastInfo = ({ backgroundColor = '', isLighter = false, isSmall = false }) => {
  const isDark = useDarkMode();
  const theme = isDark ? darkTheme : lightTheme;
  const textColor = isLighter ? theme.colors.neutral0 : theme.colors.neutral1000;

  return (
    <Flex alignItems="stretch" direction="column" flex={1} textAlign="center">
      <Box
        tag="dt"
        aria-label={`${isSmall ? 'Small' : 'Large'} font and ${isLighter ? 'lighter' : 'darker'} text.`}
        paddingBottom={2}
        style={{ color: textColor, fontSize: isSmall ? '12px' : '16px' }}
      >
        A
      </Box>
      <Box
        tag="dd"
        background="neutral1000"
        borderRadius="4px"
        color="neutral0"
        padding="4px 2px"
        textAlign="center"
        style={{ fontSize: '12px', textTransform: 'uppercase' }}
      >
        {tinycolor2.isReadable(textColor, backgroundColor, { level: 'AAA', size: isSmall ? 'small' : 'large' })
          ? 'Pass'
          : 'Fail'}
      </Box>
    </Flex>
  );
};

export { ColorCards };
