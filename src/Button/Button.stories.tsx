import * as React from 'react';
import {  Meta } from '@storybook/react/types-6-0';

import { Button } from './Button';

export const Primary = () => <Button>Hello world</Button>

export default {
    title: 'Button',
    component: Button,
} as Meta;

