import { Box, Flex } from '@strapi/design-system';
import { COLOR_CARD_NAMES, COLOR_SHADE_DEFAULT, COLOR_SUMMARY_NAMES } from './color';

export const ColorSummary = (props) => (
  <Box padding={11} background="neutral100" style={{ margin: '0 0 64px' }} {...props}>
    <Flex gap={6} justifyContent="center">
      {COLOR_SUMMARY_NAMES.map((colorName) => {
        const colorNameLower = colorName.toLowerCase();
        const colorShade = colorNameLower === 'neutral' ? 900 : COLOR_SHADE_DEFAULT;
        const colorKey = `${colorNameLower}${colorShade}`;
        const hasShadesSection = COLOR_CARD_NAMES.includes(colorName);

        return (
          <Box
            key={`StrapiDSColorPalette${colorName}Sample`}
            as={hasShadesSection ? 'a' : 'div'}
            {...(hasShadesSection ? { href: `#${colorNameLower}` } : {})}
            title={`Visual sample for color ${colorName} ${colorShade}${
              hasShadesSection ? ` (Click for more shades)` : ''
            }`}
            background={colorKey}
            borderRadius="50%"
            height="42px"
            width="42px"
            tabIndex="0"
          />
        );
      })}
    </Flex>
  </Box>
);
