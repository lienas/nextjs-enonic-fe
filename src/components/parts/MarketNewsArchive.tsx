import React from 'react';
import {Heading, ListItem, UnorderedList} from "@chakra-ui/react";
import {PartProps} from "../../_enonicAdapter/views/BasePart";
import getMarketNewsByPath from "../queries/getMarketNewsByPath";
import {Context} from "../../pages/[[...contentPath]]";
import {VariablesGetterResult} from "../../_enonicAdapter/ComponentRegistry";
import PropsView from "../views/Props";

const MarketNewsArchive = (props: PartProps) => {

    const news: {}[] = props.data.query;

    return (
        <>
            <Heading> News Archiv </Heading>
            <UnorderedList>
                {news.map((item: any, key: number) => {
                        return (
                            <ListItem key={key}>
                                ({item.data.pubDate}) {item.data.source} - {item.displayName}
                            </ListItem>
                        )
                    }
                )}
            </UnorderedList>
            <PropsView {...props}/>
        </>)
};

export default MarketNewsArchive;

export const getMarketNewsArchive = {
    query: getMarketNewsByPath,
    variables: function (path: string, context?: Context, config?: any): VariablesGetterResult {
        return {
            path: path,
            "query": " _path LIKE '*/markt-news/2022/*' AND type LIKE '*marketNews'",
            "sort": "data.pubDate DESC"
        }
    }
}
