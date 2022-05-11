import React from 'react';
import {Button, HStack, Icon, IconButton} from "@chakra-ui/react";
import {ArrowBackIcon, ArrowForwardIcon} from "@chakra-ui/icons";
import NextLink from "next/link";

export interface PagerProps {
    total: number;
    pageSize: number;
    pageIndex: number;
    url: string;
}

const Pager = (props: PagerProps) => {
    const {total, pageSize, pageIndex, url} = props;
    const pagesTotal = Math.ceil(total / pageSize);
    const hasNext = pageIndex < pagesTotal;
    const prevUrl = pageIndex != 1 ? `${url}?page=${pageIndex - 1}` : `${url}`;
    const hasPrev = pageIndex > 1;
    const nextPageIndex = Number.parseInt(String(pageIndex)) + (hasNext ? 1 : 0);
    const nextUrl = `${url}?page=${nextPageIndex}`

    let links: Array<string> = [];
    for (let i = 0; i < pagesTotal; i++) {
        i === 0 ? links.push(url) : links.push(`${url}?page=${i + 1}`);
    }

    console.log("Pager:: PagerProps = %s ", props);
    if (total <= pageSize + 1) {
        return null;
    }

    return (
        <HStack my={2}>
            <NextLink href={prevUrl} passHref>
                <IconButton
                    as={"a"}
                    variant="outline"
                    disabled={!hasPrev}
                    size={"xs"}
                    aria-label={"previous"}>
                    <ArrowBackIcon/>
                </IconButton>
            </NextLink>
            {
                links.map((link, index) => {
                    const activePage = index + 1 == pageIndex;
                    return (
                        <NextLink key={index} href={link} passHref>
                            <Button as={"a"}
                                    variant={activePage ? "solid" : "outline"}
                                    colorScheme={activePage ? "orange" : "gray"}
                                    disabled={activePage}
                                    size={"xs"}>
                                {index + 1}
                            </Button>
                        </NextLink>
                    )
                })
            }
            <NextLink href={nextUrl} passHref>
                <IconButton
                    as={"a"}
                    variant="outline"
                    disabled={!hasNext}
                    size={"xs"}
                    aria-label={"next"}>
                    <ArrowForwardIcon/>
                </IconButton>
            </NextLink>
        </HStack>
    );
};

export default Pager;
