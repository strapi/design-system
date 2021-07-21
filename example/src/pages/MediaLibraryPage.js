import React from 'react';
import { AppLayout } from '../layouts/AppLayout';
import { GridLayout, Box, HeaderLayout } from '@strapi/design-system';

function MediaLibraryPage() {
    return (
        <AppLayout>
            <GridLayout header={<HeaderLayout title='Media Library' subtitle='75 assets' />}>
                <Box padding={4} background='neutral0' hasRadius shadow='tableShadow'>hello</Box>
                <Box padding={4} background='neutral0' hasRadius shadow='tableShadow'>hello</Box>
                <Box padding={4} background='neutral0' hasRadius shadow='tableShadow'>hello</Box>
                <Box padding={4} background='neutral0' hasRadius shadow='tableShadow'>hello</Box>
                <Box padding={4} background='neutral0' hasRadius shadow='tableShadow'>hello</Box>
                <Box padding={4} background='neutral0' hasRadius shadow='tableShadow'>hello</Box>
            </GridLayout>
        </AppLayout>
    )
}

export default MediaLibraryPage
