import * as React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { Button } from './Button';

export const Primary = () => {
    return <Button>Hello world</Button>;
};

Primary.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/PICiE8O4NLrHO1lhJftLdE/Design-System-%E2%9C%85?node-id=866%3A481',
    },
};

export default {
    title: 'Button',
    component: Button,
    decorators: [withDesign],
} as Meta;
