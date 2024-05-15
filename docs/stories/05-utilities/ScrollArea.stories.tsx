import { Meta, StoryObj } from '@storybook/react';
import { Flex, Box, ScrollArea } from '@strapi/design-system';

import { P } from '../../components/Typography';

const DATA = [
  'In the winter of 2020, on a sunny and crisp morning I bumped into an old acquaintance of mine at the tree lined banks of the river Thames. Smiling at the world comfortably with hands in pockets, the man seeming without a care in the world.',
  "On noticing me he exclaimed, and led his friend placing an arm over the man's shoulder over to me, already singing my praises and opening his greetings with a well meaning and personally insightful question.",
  'The man, of course, was Ted Lasso. A Kansas-born American football coach turned UK football coaching phenomenon.',
  "Few of my interviewees would have such a reaction seeing the outside of their working lives, knowing that I could ask questions that would make them uncomfortable or that they wouldn't know how to answer. As well as knowing that what they chose to share with me was in confidence but could be shared with all of those that read my articles. However for Ted that personally(?) never made an impact. For Ted, everyone that comes into his life is a personal friend, no matter the circumstances of meeting. This attitude, it becomes clear, and I truly hope you will understand the power of its effect by the time you finish reading this book, contributed not only to Ted's personal life but the sporting capabilities of the AFC's Richmond team.",
  "When I first met Ted the situation(?) was different. Humiliation would best describe Ted's first...shockwaves through the community as they knew that they would be modifying as a result when they unabashedly...for the effect of that football...No one could have guessed what that new impact would eventually be.",
];

const meta: Meta<typeof ScrollArea> = {
  title: 'Utilities/ScrollArea',
  component: ScrollArea,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => {
      return (
        <Flex width="100%" justifyContent="center">
          <Box tag="main" height="30rem" maxWidth="40rem">
            {Story()}
          </Box>
        </Flex>
      );
    },
  ],
  render: () => {
    return (
      <ScrollArea>
        {DATA.map((datum, index) => (
          <P key={index}>{datum}</P>
        ))}
      </ScrollArea>
    );
  },
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Base = {
  name: 'base',
} satisfies Story;
