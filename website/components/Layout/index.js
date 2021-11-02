import styled from "styled-components";
import Head from 'components/Head';
import Navbar from 'components/Navbar';
import StyledLink from "components/StyledLink";

const Wrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr 4fr 1fr;
    gap:2rem;
    padding:1.5rem;
`;

const Main = styled.div`
    background: #FFFFFF;
    border-radius: 4px;
    filter: drop-shadow(0px 1px 4px rgba(33, 33, 52, 0.1));
    padding: 3rem 3.5rem;
`;

const Footer = styled.footer`
    display: flex;
    gap:2rem;
    padding: 38px 0;
`;

const Layout = ({
    children,
    meta
}) => {

    return (
    <Wrapper>
        <Head meta={meta}/>
        <header>
            <Navbar
                navigationContent={
                    [
                        {
                            title:"getting started",
                            pages:[
                                {
                                    name:"principles", 
                                    link:"/"
                                },
                                {
                                    name:"Accessibility",
                                    link:"#"
                                }
                            ]
                        }
                    ]
                }
            />
        </header>
        <div>
            <Main>
                {children}
            </Main>
            <Footer>
                <StyledLink href="https://strapi.io" target="_blank">© 2021 Strapi</StyledLink>
                <StyledLink href="https://strapi.io/careers" target="_blank">Careers</StyledLink>
                <StyledLink href="#" target="_blank">Privacy</StyledLink>
                <StyledLink href="#" target="_blank">License</StyledLink>
                <StyledLink href="https://strapi.io" target="_blank">strapi.io</StyledLink>
            </Footer>
        </div>
    </Wrapper>
    )

}

export default Layout;