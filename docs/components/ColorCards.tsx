import { lightTheme, Box, Flex, Grid, Typography } from '@strapi/design-system';
import tinycolor2 from 'tinycolor2';

const COLOR_SHADES = [100, 200, 500, 600, 700];
const COLOR_SHADES_REVERSE = COLOR_SHADES.reverse();
const COLOR_SUMMARY_NAMES = ['Neutral', 'Primary', 'Success', 'Danger', 'Warning', 'Secondary', 'Alternative'];
const COLOR_CARD_NAMES = COLOR_SUMMARY_NAMES.filter((colorName) => !['Neutral'].includes(colorName));

const H2 = (props) => (
  <Box paddingBottom={4}>
    <Typography as="h2" variant="beta" textColor="neutral800" {...props} />
  </Box>
);

const ColorCardInfoContrast = ({ backgroundColor = '', isLighter = false, isSmall = false }) => {
  const textColor = isLighter ? '#FFF' : '#000';

  return (
    <Flex alignItems="stretch" direction="column" flex={1} textAlign="center">
      <Box
        as="dt"
        aria-label={`${isSmall ? 'Small' : 'Large'} font and ${isLighter ? 'lighter' : 'darker'} text.`}
        paddingBottom={2}
        style={{ color: textColor, fontSize: isSmall ? '12px' : '16px' }}
      >
        A
      </Box>
      <Box
        as="dd"
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

/* -------------------------------------------------------------------------------------------------
 * ColorShades
 * -----------------------------------------------------------------------------------------------*/

const ColorShades = () => {
  return (
    <Flex as="article" alignItems="stretch" direction="column" gap={8} paddingBottom={8}>
      {COLOR_CARD_NAMES.map((colorName) => {
        return (
          <Box key={colorName}>
            <H2>{colorName} colors</H2>
            <Grid as="ol" gap={6} gridCols={3}>
              {COLOR_SHADES_REVERSE.map((colorShade) => (
                <li key={`${colorName}${colorShade}`}>
                  <Card
                    colorKey={`${colorName.toLowerCase()}${colorShade}`}
                    colorName={colorName}
                    colorShade={colorShade}
                  />
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
  colorShade: number;
}

const Card = ({ colorKey, colorName, colorShade }: CardProps) => {
  const colorHex = lightTheme.colors[colorKey];

  if (!colorHex) {
    return null;
  }

  const colorRef = tinycolor2(colorHex);
  const colorRGB = `${colorRef.toRgb().r}, ${colorRef.toRgb().g}, ${colorRef.toRgb().b}`;

  return (
    <Box as="article" background="neutral100" borderRadius="8px" tabIndex="0" aria-label={`${colorName} ${colorShade}`}>
      <Flex
        as="dl"
        alignItems="end"
        direction="row"
        background={colorKey}
        borderRadius="8px 8px 0 0"
        padding={4}
        minHeight="104px"
        aria-label={`Contrast accessibility checks for ${colorName} ${colorShade}`}
        gap={2}
      >
        <ColorCardInfoContrast backgroundColor={colorHex} />
        <ColorCardInfoContrast backgroundColor={colorHex} isSmall />
        <ColorCardInfoContrast backgroundColor={colorHex} isLighter />
        <ColorCardInfoContrast backgroundColor={colorHex} isLighter isSmall />
      </Flex>
      <Grid
        as="dl"
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
            <Typography as="dt" variant="sigma">
              {props.label}
            </Typography>
            <Typography as="dd" variant="pi">
              {props.content}
            </Typography>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export { ColorShades as ColorCards };
