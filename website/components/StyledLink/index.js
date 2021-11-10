import styled from "styled-components";

const StyledLink = styled.a`
    color:var(--Neutral600);
    font-size: 14px;
    display: flex;
    align-content: center;
    padding: ${(props)=> `${props.padding}px 0`};
`

export default StyledLink;