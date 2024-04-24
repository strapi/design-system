import { Meta, StoryObj } from '@storybook/react';
import {
  TextInput,
  Box,
  Flex,
  IconButton,
  Link,
  RawTable,
  RawTh,
  RawTd,
  RawTr,
  RawThead,
  RawTbody,
} from '@strapi/design-system';
import { Pencil, Trash } from '@strapi/icons';

const meta: Meta<typeof RawTable> = {
  title: 'Design System/Technical Components/RawTable',
  component: RawTable,
};

export default meta;

type Story = StoryObj<typeof RawTable>;

export const Base = {
  render: () => {
    const ROW_COUNT = 30;
    const COL_COUNT = 5;
    const rows = Array(ROW_COUNT - 1)
      .fill(null)
      .map(() =>
        Array(COL_COUNT)
          .fill(null)
          .map((e, x) => x),
      );

    return (
      <Box shadow="filterShadow" padding={3} hasRadius>
        <RawTable colCount={COL_COUNT} rowCount={ROW_COUNT}>
          <RawThead>
            <RawTr>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  One
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Two
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Three
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Four
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Five
                </Box>
              </RawTh>
            </RawTr>
          </RawThead>
          <RawTbody>
            {rows.map((row, rowIndex) => (
              <RawTr key={`row-${rowIndex}`}>
                {row.map((cell) => (
                  <RawTd key={`cell-${rowIndex}-${cell}`}>
                    <Box color="neutral800" padding={2}>
                      {rowIndex}/{cell}
                    </Box>
                  </RawTd>
                ))}
              </RawTr>
            ))}
          </RawTbody>
        </RawTable>
      </Box>
    );
  },

  name: 'base',
} satisfies Story;

export const Simple = {
  render: () => {
    const ROW_COUNT = 30;
    const COL_COUNT = 5;

    return (
      <Box shadow="filterShadow" padding={3} hasRadius>
        <RawTable colCount={COL_COUNT} rowCount={ROW_COUNT}>
          <RawThead>
            <RawTr>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  One
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Two
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Three
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Four
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Five
                </Box>
              </RawTh>
            </RawTr>
          </RawThead>
          <RawTbody>
            <RawTr>
              <RawTd color="neutral800">2/1</RawTd>
              <RawTd color="neutral800">2/2</RawTd>
              <RawTd color="neutral800">2/3</RawTd>
              <RawTd color="neutral800">2/4</RawTd>
              <RawTd color="neutral800">2/5</RawTd>
            </RawTr>
            <RawTr>
              <RawTd color="neutral800">3/1</RawTd>
              <RawTd>
                <Link href="#">Link to somewhere</Link>
              </RawTd>
              <RawTd color="neutral800">3/3</RawTd>
              <RawTd color="neutral800">3/4</RawTd>
              <RawTd color="neutral800">3/5</RawTd>
            </RawTr>
          </RawTbody>
        </RawTable>
      </Box>
    );
  },

  name: 'simple',
} satisfies Story;

export const Aria = {
  render: () => {
    const ROW_COUNT = 30;
    const COL_COUNT = 5;
    const rows = Array(ROW_COUNT - 1)
      .fill(null)
      .map(() =>
        Array(COL_COUNT)
          .fill(null)
          .map((e, x) => x),
      );

    return (
      <Box shadow="filterShadow" padding={3} hasRadius>
        <RawTable colCount={COL_COUNT} rowCount={ROW_COUNT}>
          <RawThead>
            <RawTr>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  One
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Two
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Three
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Four
                </Box>
              </RawTh>
              <RawTh>
                <Box color="neutral800" padding={2} background="neutral200">
                  Five
                </Box>
              </RawTh>
            </RawTr>
          </RawThead>
          <RawTbody>
            {rows.map((row, rowIndex) => (
              <RawTr key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) =>
                  cellIndex === 3 ? (
                    <RawTd key={cellIndex}>
                      <TextInput aria-label="name" />
                    </RawTd>
                  ) : cellIndex === row.length - 1 ? (
                    <RawTd key={cellIndex}>
                      <Flex>
                        <IconButton onClick={() => console.log('edit')} label="Edit" noBorder icon={<Pencil />} />
                        <Box paddingLeft={1}>
                          <IconButton onClick={() => console.log('delete')} label="Delete" noBorder icon={<Trash />} />
                        </Box>
                      </Flex>
                    </RawTd>
                  ) : (
                    <RawTd key={`cell-${rowIndex}-${cell}`}>
                      <Box color="neutral800" padding={2}>
                        {rowIndex}/{cell}
                      </Box>
                    </RawTd>
                  ),
                )}
              </RawTr>
            ))}
          </RawTbody>
        </RawTable>
      </Box>
    );
  },

  name: 'aria',
} satisfies Story;
