import tinycolor2 from 'tinycolor2';
import PropTypes from 'prop-types';
import { lightTheme, Box, Flex, Grid, GridItem, Typography } from '@strapi/design-system';
import { COLOR_CARD_NAMES, COLOR_SHADES_REVERSE } from './color';
import { H2 } from './Typography';

const ColorCardInfoCel = ({ content, label, ...rest }) => (
  <Box {...rest}>
    <Typography as="div" variant="sigma">
      {label}
    </Typography>
    <Typography as="div" variant="pi">
      {content}
    </Typography>
  </Box>
);

ColorCardInfoCel.propTypes = {
  content: PropTypes.node,
  label: PropTypes.node,
};

const ColorCardInfoContrast = ({ backgroundColor = '', textColor = '#000', isSmall = false }) => (
  <Box textAlign="center">
    <Box fontSize={isSmall ? '12px' : '16px'} paddingBottom={2} style={{ color: textColor }}>
      A
    </Box>
    <Box
      background="neutral1000"
      borderRadius="4px"
      color="neutral0"
      fontSize="12px"
      padding="4px 2px"
      textAlign="center"
    >
      {tinycolor2.isReadable(textColor, backgroundColor, { level: 'AAA', size: isSmall ? 'small' : 'large' })
        ? 'PASS'
        : 'FAIL'}
    </Box>
  </Box>
);

ColorCardInfoContrast.propTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
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
    <Box background="neutral100" borderRadius="8px" tabIndex="0">
      <Flex
        alignItems="stretch"
        direction="column"
        justifyContent="end"
        background={colorKey}
        borderRadius="8px 8px 0 0"
        padding={4}
        minHeight="104px"
      >
        <Grid gap={2} gridCols={4} style={{ alignItems: 'end' }}>
          <GridItem>
            <ColorCardInfoContrast backgroundColor={colorHex} />
          </GridItem>
          <GridItem>
            <ColorCardInfoContrast backgroundColor={colorHex} isSmall />
          </GridItem>
          <GridItem>
            <ColorCardInfoContrast backgroundColor={colorHex} textColor="#FFF" />
          </GridItem>
          <GridItem>
            <ColorCardInfoContrast backgroundColor={colorHex} textColor="#FFF" isSmall />
          </GridItem>
        </Grid>
      </Flex>
      <Box padding={4} minHeight="104px">
        <Grid gap={2} gridCols={2}>
          <GridItem>
            <ColorCardInfoCel label="Name" content={`${colorName} ${colorShade}`} />
          </GridItem>
          <GridItem>
            <ColorCardInfoCel label="Key" content={colorKey} />
          </GridItem>
          <GridItem>
            <ColorCardInfoCel label="RGB" content={colorRGB} />
          </GridItem>
          <GridItem>
            <ColorCardInfoCel label="Hexa" content={colorHex} />
          </GridItem>
        </Grid>
      </Box>
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
                <GridItem key={`StrapiDSColorPalette${colorName}${colorShade}`}>
                  <ColorCard
                    colorKey={`${colorNameLower}${colorShade}`}
                    colorName={colorName}
                    colorShade={colorShade}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Flex>
  );
};
