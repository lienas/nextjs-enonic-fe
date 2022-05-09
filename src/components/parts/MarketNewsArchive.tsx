import React from 'react';
import {Box, Heading, Link, ListItem, UnorderedList} from "@chakra-ui/react";
import {PartProps} from "../../_enonicAdapter/views/BasePart";
import getMarketNewsByPath from "../queries/getMarketNewsByPath";
import {Context} from "../../pages/[[...contentPath]]";
import {VariablesGetterResult} from "../../_enonicAdapter/ComponentRegistry";
import PropsView from "../views/Props";
import Pager from "../ui/Pager";
import {getUrl} from "../../_enonicAdapter/utils";
import NextLink from "next/link";

const MarketNewsArchive = (props: PartProps) => {

    const {meta, data, part} = props;

    const news: {}[] = data.queryConnection.edges;
    const total: number = data.queryConnection.totalCount;
    const pageIndex: number = data.pageIndex;

    return (
        <>
            <Heading> News Archiv </Heading>
            <Box>{total} News</Box>
            <UnorderedList>
                {news && news.map((item: any, key: number) => {
                        return (
                            <ListItem key={key}>
                                <NextLink href={parseUrl(item.node._path)} passHref>
                                    <Link>({item.node.data.pubDate}) {item.node.data.source} - {item.node.displayName}</Link>
                                </NextLink>
                            </ListItem>
                        )
                    }
                )}
            </UnorderedList>
            <Pager total={total}
                   pageSize={part.config.first || 25}
                   pageIndex={pageIndex}
                   url={getUrl(meta.path)}/>
            <PropsView {...props}/>
        </>)
};

export default MarketNewsArchive;

export const getMarketNewsArchive = {
    query: getMarketNewsByPath,
    variables: function (path: string, context?: Context, config?: any): VariablesGetterResult {
        //todo: make helper function for that
        let pageIndex = context?.query?.page;
        let pageSize = config?.first || 25;

        if (pageIndex) {
            pageIndex = pageIndex[0];
        } else {
            pageIndex = "1"
        }
        let offset = ((Number.parseInt(pageIndex) - 1) * pageSize);
        if (pageIndex !== "1") offset -= 1;
        let buff = new Buffer(offset.toString());
        let base64data

        pageIndex === "1" ?
            base64data = undefined :
            base64data = buff.toString('base64');


        return {
            path: path,
            "query": `_path LIKE '*${path}*' AND type LIKE '*marketNews'`,
            "sort": "data.pubDate DESC",
            "offset": base64data,
            "first": pageSize
        }
    }
}

export async function newsArchiveProcessor(common: any, context?: Context): Promise<any> {
    common.pageIndex = context?.query?.page || 1;
    return common;
}

const parseUrl = (path: string): string => {
    const strippedPath = path.split("/").slice(2).join("/");
    return getUrl(strippedPath);
}
