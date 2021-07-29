import React from 'react';
import { Row, Text } from "@strapi/design-system";
import { Expand } from "@strapi/icons";

import {
    FooterWrapper,
    ExpandButton
} from './WysiwygStyles';

const WysiwygFooter = () => {
    return (
        <FooterWrapper padding={2} background='neutral100'>
            <Row justifyContent='flex-end' alignItems='flex-end' >
                <ExpandButton>
                    <Text>Expand</Text>
                    <Expand/>
                </ExpandButton>
            </Row>
        </FooterWrapper>
    )
};

export default WysiwygFooter;
