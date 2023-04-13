import tinycolor2 from 'tinycolor2';
import PropTypes from 'prop-types';
import { lightTheme, Box, Flex, Grid, Typography } from '@strapi/design-system';
import { COLOR_CARD_NAMES, COLOR_SHADES_REVERSE } from './color';
import { H2 } from './Typography';

const ColorCardInfoCel = ({ content, label, ...rest }) => (
  <Box {...rest}>
    <Typography as="dt" variant="sigma">
      {label}
    </Typography>
    <Typography as="dd" variant="pi">
      {content}
    </Typography>
  </Box>
);

ColorCardInfoCel.propTypes = {
  content: PropTypes.node,
  label: PropTypes.node,
};

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
        style={{ fontSize: '12px' }}
      >
        {tinycolor2.isReadable(textColor, backgroundColor, { level: 'AAA', size: isSmall ? 'small' : 'large' })
          ? 'PASS'
          : 'FAIL'}
      </Box>
    </Flex>
  );
};

ColorCardInfoContrast.propTypes = {
  backgroundColor: PropTypes.string,
  colorName: PropTypes.string,
  colorShade: PropTypes.number,
  isLighter: PropTypes.boolean,
  isSmall: PropTypes.boolean,
};

const ColorCard = ({ colorKey = '', colorName, colorShade }) => {
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
        <ColorCardInfoCel label="Name" content={`${colorName} ${colorShade}`} />
        <ColorCardInfoCel label="Key" content={colorKey} />
        <ColorCardInfoCel label="RGB" content={colorRGB} />
        <ColorCardInfoCel label="Hexa" content={colorHex} />
      </Grid>
    </Box>
  );
};

ColorCard.propTypes = {
  colorKey: PropTypes.string,
  colorName: PropTypes.string,
  colorShade: PropTypes.number,
};

export const ColorShades = () => {
  return (
    <Flex alignItems="stretch" direction="column" gap={11} paddingBottom={11}>
      {COLOR_CARD_NAMES.map((colorName) => {
        const colorNameLower = colorName.toLowerCase();

        return (
          <Box key={`StrapiDSColorPalette${colorName}`}>
            <H2>{colorName} colors</H2>
            <Grid gap={6} gridCols={3}>
              {COLOR_SHADES_REVERSE.map((colorShade) => (
                <ColorCard
                  key={`StrapiDSColorPalette${colorName}${colorShade}`}
                  colorKey={`${colorNameLower}${colorShade}`}
                  colorName={colorName}
                  colorShade={colorShade}
                />
              ))}
            </Grid>
          </Box>
        );
      })}
    </Flex>
  );
};
