import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledLink from 'components/StyledLink';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { useTheme } from '@strapi/design-system/ThemeProvider';
import Link from 'next/link';

const Wrapper = styled.div`
  border-top: ${(props) => `1px solid ${props.theme.colors.neutral200}`};
`;

const BottomNavigation = ({ next, previous }) => {
  const theme = useTheme();
  return (
    <Wrapper theme={theme}>
      <Flex justifyContent="space-between" paddingTop={8}>
        <div>
          {previous.path && (
            <>
              <Typography variant="epsilon" textColor="neutral700">
                Previous
              </Typography>
              <Link href={previous.path} passHref>
                <StyledLink theme={theme} active={true} padding={0} size={18}>
                  {previous.title}
                </StyledLink>
              </Link>
            </>
          )}
        </div>
        <div>
          {next.path && (
            <>
              <Typography variant="epsilon" textColor="neutral700">
                Next
              </Typography>
              <Link href={next.path} passHref>
                <StyledLink theme={theme} active={true} padding={0} size={18}>
                  {next.title}
                </StyledLink>
              </Link>
            </>
          )}
        </div>
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
