import * as React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { Button } from './Button';
import { useTheme } from '../ThemeProvider';

export const Primary = () => {
    const theme = useTheme();
    console.log('theme', theme);
    return <Button>Hello world</Button>;
};

export default {
    title: 'Button',
    component: Button,
} as Meta;
