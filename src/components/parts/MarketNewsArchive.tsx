import React from 'react';
import {Badge, Box, Heading, Link, ListItem, Text, UnorderedList} from "@chakra-ui/react";
import {PartProps} from "../../_enonicAdapter/views/BasePart";
import PropsView from "../ui/debug/Props";
import Pager from "../ui/Pager";
import {getUrl} from "../../_enonicAdapter/utils";
import NextLink from "next/link";
import NewsList from "../views/NewsList";
import NewsCards from "../views/NewsCards";

const MarketNewsArchive = (props: PartProps) => {

    const {meta, data, part} = props;

    const news: {}[] = data.queryConnection.edges;
    const total: number = data.queryConnection.totalCount;
    const pageIndex: number = data.pageIndex;

    //console.log("NEWS = ", news );

    return (
        <>
            <Heading> News Archiv </Heading>
            <Box>{total} News</Box>
           {/* <NewsList news={news}/>*/}
            <NewsCards news={news}/>

            <Pager total={total}
                   pageSize={part.config.first || 25}
                   pageIndex={pageIndex}
                   url={getUrl(meta.path)}/>
            <PropsView {...props}/>
        </>)
};

export default MarketNewsArchive;


