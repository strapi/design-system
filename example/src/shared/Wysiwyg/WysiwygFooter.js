import React from 'react';
import { Row, Text } from "@strapi/parts";
import { Expand } from "@strapi/icons";

import {
    FooterWrapper,
    ExpandButton
} from './WysiwygStyles';

const WysiwygFooter = ({isPreviewMode}) => {
    return (
        <FooterWrapper padding={2} background='neutral100'>
            <Row justifyContent='flex-end' alignItems='flex-end' >
                <ExpandButton disabled={isPreviewMode ? true : false} onClick={() => console.log('expand')}>
                    <Text>Expand</Text>
                    <Expand/>
                </ExpandButton>
            </Row>
        </FooterWrapper>
    )
};

export default WysiwygFooter;
