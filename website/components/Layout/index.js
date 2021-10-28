import styled from "styled-components";
import Head from 'components/Head';
import Navbar from 'components/Navbar';

const Wrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr 4fr 1fr;
    gap:2rem;
    padding:1.5rem;
`;


const Layout = ({
    children,
    meta
}) => {

    return (
    <Wrapper meta={meta}>
        <Head meta={meta}/>
        <header>
            <Navbar/>
        </header>
        <div>
            <main>
                {children}
            </main>
            <footer className="py-8">
            </footer>
        </div>
    </Wrapper>
    )

}

export default Layout;