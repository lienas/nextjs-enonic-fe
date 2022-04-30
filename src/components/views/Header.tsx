import React from "react"
import NextLink from "next/link";
import {getUrl} from "../../_enonicAdapter/utils";
import {Heading} from "@chakra-ui/react";

export interface HeaderProps {
    title: string;
    logoUrl: string;
}


const Header = ({title, logoUrl}: HeaderProps) => {

    return (<header
        style={{
            background: `rebeccapurple`,
            marginBottom: `1.45rem`,
        }}
    >
        <div
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`,
                display: `flex`,
                justifyContent: 'space-between'
            }}
        >
            {title && (
                <Heading color={"orange"}>
                    <NextLink
                        href={getUrl('')}>
                        <a style={{
                            color: `white`,
                            textDecoration: `none`,
                        }}
                        >
                            {title}
                        </a>
                    </NextLink>
                </Heading>
            )}
            {logoUrl && (
                <img src={logoUrl}
                     width={33}
                     height={40}
                     alt={"Enonic XP logo"}
                />
            )}
        </div>
    </header>
)};


export default Header
