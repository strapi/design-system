import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledLink from 'components/StyledLink';
import { Typography } from '@strapi/design-system/Typography';
import Link from 'next/link';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--Neutral200);
  padding-top: 2.5rem;
`;

const BottomNavigation = ({ next, previous }) => {
  return (
    <Wrapper>
      <div>
        {previous.path && (
          <>
            <Typography variant="epsilon" textColor="neutral700">
              Previous
            </Typography>
            <Link href={previous.path} passHref>
              <StyledLink active={true} padding={0} size={18}>
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
              <StyledLink active={true} padding={0} size={18}>
                {next.title}
              </StyledLink>
            </Link>
          </>
        )}
      </div>
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
