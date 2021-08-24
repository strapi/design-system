import React from 'react';
import { Row, Text, Box } from "@strapi/parts";
import { Expand } from "@strapi/icons";

import { ExpandButton } from './WysiwygStyles';

const WysiwygFooter = ({isPreviewMode, onToggleExpand}) => {
    return (
      <Box padding={2} background='neutral100' hasRadius>
        <Row justifyContent='flex-end' alignItems='flex-end' >
          <ExpandButton disabled={isPreviewMode ? true : false} onClick={onToggleExpand}>
            <Text>Expand</Text>
            <Expand/>
          </ExpandButton>
        </Row>
      </Box>
    )
};

export default WysiwygFooter;
