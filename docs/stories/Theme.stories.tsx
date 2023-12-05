import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Flex,
  Typography,
  Grid,
  GridItem,
  useTheme,
  Searchbar,
  SearchForm,
  Icon,
  Tooltip,
  darkTheme,
  lightTheme,
} from '@strapi/design-system';
import * as AllIcons from '@strapi/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const meta: Meta = {
  title: 'Design System/Components/Theme',
};

export default meta;

type Story = StoryObj;

export const LightColors = {
  render: () => {
    const colors: Array<{ colorKey: string; colorValue: string }[]> = [];
    let ruptureKey = '';

    for (const colorKey of Object.keys(lightTheme.colors)) {
      const prefix = colorKey.substr(0, 2);

      if (ruptureKey !== prefix) {
        colors.push([]);
        ruptureKey = prefix;
      }

      colors[colors.length - 1].push({
        colorKey,
        colorValue: lightTheme.colors[colorKey],
      });
    }

    return (
      <Box>
        <Grid>
          {colors.map((colorGroup, idx) => (
            <GridItem key={`color-group-${idx}`} padding={4}>
              <Flex direction="column" alignItems="stretch" gap={2}>
                {colorGroup.map(({ colorKey, colorValue }) => (
                  <ColorButton key={colorKey} colorKey={colorKey} color={colorValue} />
                ))}
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
  },

  name: 'light colors',
} satisfies Story;

export const DarkColors = {
  render: () => {
    const colors: Array<{ colorKey: string; colorValue: string }[]> = [];
    let ruptureKey = '';

    for (const colorKey of Object.keys(darkTheme.colors)) {
      const prefix = colorKey.substr(0, 2);

      if (ruptureKey !== prefix) {
        colors.push([]);
        ruptureKey = prefix;
      }

      colors[colors.length - 1].push({
        colorKey,
        colorValue: darkTheme.colors[colorKey],
      });
    }

    return (
      <Box>
        <Grid>
          {colors.map((colorGroup, idx) => (
            <GridItem key={`color-group-${idx}`} padding={4}>
              <Flex direction="column" alignItems="stretch" gap={2}>
                {colorGroup.map(({ colorKey, colorValue }) => (
                  <ColorButton key={colorKey} colorKey={colorKey} color={colorValue} />
                ))}
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
  },

  name: 'dark colors',
} satisfies Story;

export const Shadows = {
  render: () => {
    const theme = useTheme();
    const shadows = Object.keys(theme.shadows);

    return (
      <Box padding={8} background="neutral100">
        <Grid gap={4}>
          {shadows.map((shadow) => (
            <GridItem padding={8} shadow={shadow} background="neutral0" col={3} key={shadow}>
              <Typography>{shadow}</Typography>
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
  },

  name: 'shadows',
} satisfies Story;

export const Spaces = {
  render: () => {
    const theme = useTheme();
    const spaces = Object.keys(theme.spaces);

    return (
      <Box padding={8} background="neutral100">
        <Flex direction="column" alignItems="stretch" gap={1}>
          {spaces.map((space) => (
            <Flex key={`space-${space}`}>
              <Box paddingLeft={2}>
                <Typography>{space}</Typography> <Typography variant="pi">({theme.spaces[space]})</Typography>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    );
  },

  name: 'spaces',
} satisfies Story;

export const Icons = {
  render: () => {
    const [value, setValue] = React.useState('');

    const iconsArray = Object.keys(Icons)
      .filter((icon) => {
        if (!value) {
          return true;
        }

        return icon.toLowerCase().includes(value.toLowerCase());
      })
      .sort();

    return (
      <Box>
        <Box paddingBottom={8}>
          <SearchForm>
            <Searchbar
              name="searchbar"
              onClear={() => setValue('')}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              clearLabel="Clearing the asset search"
              placeholder="e.g: AddAsset"
            >
              Search for an icon
            </Searchbar>
          </SearchForm>
        </Box>
        <Box padding={8} background="neutral100">
          <Grid gap={2}>
            {iconsArray.map((icon) => {
              // eslint-disable-next-line import/namespace
              const RealIcon = AllIcons[icon];

              return (
                <GridItem padding={2} col={2} key={icon} background="neutral0">
                  <Box>
                    <Icon
                      aria-hidden
                      colors={(theme) => ({
                        rect: {
                          fill: theme.colors.danger600,
                        },
                      })}
                      as={RealIcon}
                      fontSize={5}
                    />
                  </Box>
                  <Box>
                    <Tooltip description="Copy import">
                      <CopyToClipboard text={`import ${icon} from '@strapi/icons/${icon}';`}>
                        <Typography fontWeight="bold" as="button" type="button">
                          {icon}
                        </Typography>
                      </CopyToClipboard>
                    </Tooltip>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      </Box>
    );
  },

  name: 'icons',
} satisfies Story;

interface ColorButtonProps {
  color: string;
  colorKey: string;
}

export const ColorButton = ({ colorKey, color }: ColorButtonProps) => {
  return (
    <Box background={color} paddingTop={6} paddingLeft={6} hasRadius shadow="popupShadow" borderColor="neutral200">
      <Box background="neutral0" padding={1}>
        <Typography>{colorKey}</Typography>
      </Box>
    </Box>
  );
};
