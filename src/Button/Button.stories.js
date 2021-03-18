import * as React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { Button } from './Button';

export const Primary = () => {
  return <Button>Hello world</Button>;
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: process.env.FIGMA_BUTTON_URL,
  },
};

export default {
  title: 'Button',
  component: Button,
  decorators: [withDesign],
};
