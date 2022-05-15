import React from 'react';
import {Box, Button, HStack, Icon, IconButton} from "@chakra-ui/react";
import {ArrowBackIcon, ArrowForwardIcon} from "@chakra-ui/icons";
import NextLink from "next/link";

export interface PagerProps {
    total: number;
    pageSize: number;
    pageIndex: number;
    url: string;
    filter: string;
}

const Pager = (props: PagerProps) => {

    const {total, pageSize, pageIndex, url, filter} = props;
    const pagesTotal = Math.ceil(total / pageSize);
    const hasNext = pageIndex < pagesTotal;
    const hasPrev = pageIndex > 1;
    const nextPageIndex = Number.parseInt(String(pageIndex)) + (hasNext ? 1 : 0);
    const from = (pageIndex * pageSize - pageSize + 1);
    const to = hasNext ? (pageIndex * pageSize) : (pageIndex * pageSize - pageIndex * pageSize % total);

    const addFilterToQuery = (term: URLSearchParams) => {
        filter && term.append("term", filter);
    }

    const queryTermsPrevUrl = new URLSearchParams();
    if (pageIndex != 1) queryTermsPrevUrl.append('page', String(pageIndex - 1));
    addFilterToQuery(queryTermsPrevUrl);
    const prevUrl = pageIndex != 1 ? `${url}?${queryTermsPrevUrl.toString()}` : `${url}`;

    const queryTermsNextUrl = new URLSearchParams();
    queryTermsNextUrl.append('page', String(nextPageIndex));
    addFilterToQuery(queryTermsNextUrl);
    const nextUrl = `${url}?${queryTermsNextUrl}`;

    let links: Array<string> = [];
    for (let i = 0; i < pagesTotal; i++) {
        const queryTerms = new URLSearchParams();
        if (i > 0) queryTerms.append('page', String(i + 1));
        addFilterToQuery(queryTerms);
        i === 0 && Array.from(queryTerms).length === 0 ? links.push(url) : links.push(`${url}?${queryTerms.toString()}`);
    }

    if (total <= pageSize + 1) {
        return null;
    }

    return (
        <>
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
            {/*todo: i18n*/}
            <Box fontSize={"sm"} fontStyle={"italic"}>
                Zeige {to - from + 1} ({from}-{to}) von {total}
            </Box>
        </>
    );
};

export default Pager;
