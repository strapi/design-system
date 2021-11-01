import styled from "styled-components";
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from "next/router";

const SectionTitle = styled.h3`
    font-weight: 700;
    font-size: 11px;
    color: var(--Primary600);
    padding: 0.5rem 1.5rem;
    width:100%;
    text-transform: uppercase;
    display: flex;
    align-content: center;
    gap:4px;
`

const LinksList = styled.ul`
    padding:0;
    li{
        color:var(--Neutral800);
        padding: 0.5rem 0 0.5rem 2rem;
        font-size: 14px;
        list-style-position: inside;
        :hover{
            background-color:var(--Primary100);
            color:var(--Primary700);
        }
    }
    .active{
        background-color:var(--Primary100);
        color:var(--Primary700);
    }
`

const NavSection = ({title,pages}) => {

    const router = useRouter();

    return(
        <>
            <SectionTitle>
                {title} <Image src="/dropdown-icon.svg" width={7} height={4}/>
            </SectionTitle>
            <LinksList>
                {pages.map((page,index) => {
                   return <Link 
                            href={page.link} 
                            key={index} 
                            passHref
                        >
                            <li className={router.pathname == page.link ? "active" : ""}>{page.name}</li>
                        </Link>
                })}
            </LinksList>
        </>
    )
}

NavSection.protoTypes = {
    title: PropTypes.string.isRequired,
    pages:PropTypes.array
}

export default NavSection;