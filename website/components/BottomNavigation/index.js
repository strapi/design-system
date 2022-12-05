import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledLink from 'components/StyledLink';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import Link from 'next/link';

const Wrapper = styled.div`
  border-top: ${(props) => `1px solid ${props.theme.colors.neutral200}`};
`;

const BottomNavigation = ({ next, previous }) => {
  return (
    <Wrapper>
      <Flex justifyContent="space-between" paddingTop={8}>
        <Box>
          {previous.path && (
            <>
              <Typography variant="epsilon" textColor="neutral700">
                Previous
              </Typography>
              <StyledLink href={previous.path} as={Link} active padding={0} size={4}>
                {previous.title}
              </StyledLink>
            </>
          )}
        </Box>
        <Box>
          {next.path && (
            <>
              <Typography variant="epsilon" textColor="neutral700">
                Next
              </Typography>
              <StyledLink href={next.path} as={Link} active padding={0} size={4}>
                {next.title}
              </StyledLink>
            </>
          )}
        </Box>
      </Flex>
    </Wrapper>
  );
};

BottomNavigation.propTypes = {
  next: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
  }),
  previous: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
  }),
};

export default BottomNavigation;
