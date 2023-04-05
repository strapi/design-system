import { Box, Flex, Tooltip } from '@strapi/design-system';
import { COLOR_SHADE_DEFAULT, COLOR_SUMMARY_NAMES } from './color';

export const ColorSummary = (props) => (
  <Box padding={11} background="neutral100" style={{ margin: '0 0 64px' }} {...props}>
    <Flex gap={4} alignItems="center" justifyContent="center">
      {COLOR_SUMMARY_NAMES.map((colorName) => {
        const colorNameLower = colorName.toLowerCase();
        const colorShade = colorNameLower === 'neutral' ? 900 : COLOR_SHADE_DEFAULT;
        const colorKey = `${colorNameLower}${colorShade}`;

        return (
          <Box key={`StrapiDSColorPalette${colorName}Sample`}>
            <Tooltip description={`${colorName} ${colorShade}`}>
              <Box background={colorKey} borderRadius="50%" width="42px" height="42px" style={{ margin: '0 auto' }} />
            </Tooltip>
          </Box>
        );
      })}
    </Flex>
  </Box>
);
