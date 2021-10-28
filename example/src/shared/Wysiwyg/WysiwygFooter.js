import React from "react";
import PropTypes from "prop-types";
import { Flex, Text, Box } from "@strapi/design-system";
import { Expand } from "@strapi/icons";

import { ExpandButton } from "./WysiwygStyles";

const WysiwygFooter = ({ isPreviewMode, onToggleExpand }) => {
  return (
    <Box padding={2} background="neutral100" hasRadius>
      <Flex justifyContent="flex-end" alignItems="flex-end">
        <ExpandButton
          id="expand"
          disabled={isPreviewMode ? true : false}
          onClick={onToggleExpand}
        >
          <Text>Expand</Text>
          <Expand />
        </ExpandButton>
      </Flex>
    </Box>
  );
};

WysiwygFooter.defaultProps = {
  onToggleExpand: () => {},
  isPreviewMode: false,
};

WysiwygFooter.propTypes = {
  onToggleExpand: PropTypes.func,
  isPreviewMode: PropTypes.bool,
};

export default WysiwygFooter;
