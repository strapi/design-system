import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledLink from 'components/StyledLink';
import { Subtitle } from '@strapi/design-system/Text';
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
            <Subtitle textColor="neutral700">Previous</Subtitle>
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
            <Subtitle textColor="neutral700">Next</Subtitle>
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
