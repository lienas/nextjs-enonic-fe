import React from 'react';
import {Badge, Link, ListItem, Text, UnorderedList} from "@chakra-ui/react";
import NextLink from "next/link";
import {parseUrl} from "../../utils/helpers";

//todo: create typedef for news
const NewsList = (props: any) => {
    const {news} = props;
    return (
        <UnorderedList>
            {news && news.map((item: any, key: number) => {
                    const date = item.node.data.pubDate;
                    const options = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    }
                    // @ts-ignore
                    const localeDate = new Date(date).toLocaleDateString('de-DE', options);

                    return (
                        <>
                            <ListItem key={key}>
                                <Text as={"i"}
                                      fontSize={'sm'}>{localeDate} </Text><Badge>{item.node.data.source}</Badge> -
                                <NextLink href={parseUrl(item.node._path)} passHref>
                                    <Link> {item.node.displayName}</Link>
                                </NextLink>
                            </ListItem>
                        </>
                    )
                }
            )}
        </UnorderedList>
    );
};

export default NewsList;
