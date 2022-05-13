import React, {useEffect, useState} from 'react';
import {Box, Heading} from "@chakra-ui/react";
import {PartProps} from "../../_enonicAdapter/views/BasePart";
import PropsView from "../ui/debug/Props";
import Pager from "../ui/Pager";
import {getUrl} from "../../_enonicAdapter/utils";
import NewsCards from "../views/NewsCards";
import MarketNewsArchiveFilter from "./MarketNewsArchiveFilter";
import {getMarketNewsByPath} from "../queries/getMarketNewsByPath";
import {calculateCursor} from "../../utils/helpers";

const MarketNewsArchive = (props: PartProps) => {

    const {meta, data, part} = props;

    // const news: {}[] = data.queryConnection.edges;
    const [newsData, setNewsData] = useState(data.queryConnection);
    const [filter, setFilter] = useState('');
    const pageSize = part.config?.first || 25;

    let news =  newsData?.edges;

    const total: number = newsData?.totalCount;
    const pageIndex: number = data?.pageIndex;
    // const offset = calculateCursor({
    //     pageSize: parseInt(pageSize),
    //     pageIndex: pageIndex
    // });

    const getVars = () => {

        console.log("pageIndex = %s, pageSize= %s , offset = %s ", pageIndex, pageSize);

        return {
            "path": meta.path,
            "query": `_path LIKE '*${meta.path}*' AND type LIKE '*marketNews' AND fulltext('*','${filter && filter.length > 0 ? filter : ''}','AND')`,
            "sort": "data.pubDate DESC",
            "offset": undefined,
            "first": pageSize
        }
    }

    const fetchNews = async () => {
        const API_URL = "http://localhost:8080/site/next/draft/hmdb/_graphql"
        let resp;
        try {
            resp = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    query: getMarketNewsByPath,
                    variables: getVars()
                })
            })

            console.log("Status -> %s", resp.status);
            const data: any = await resp.json;
            if (data.guillotine.queryConnection.totalCount > 0) {
                console.log("Set filtered data .......");
                setNewsData(data.guillotine.queryConnection);
            }
            console.log("response = %s", JSON.stringify(data, null, 2));


        } catch (e: any) {
            console.error("Failed to fetch data");
        }
    }

    //console.log("NEWS = ", news );
    useEffect(() => {
        console.log("useEffect in MarketNewsArchive triggered");

        if (filter.length > 0) {
            fetchNews();
        } else {
            setNewsData(data.queryConnection);
        }

    }, [filter, data])

    return (
        newsData &&
        <>
            <Heading> News Archiv </Heading>
            <Box>{total} News</Box>
            {/* <NewsList news={news}/>*/}
            <MarketNewsArchiveFilter filterNews={setFilter}/>
            <NewsCards news={news}/>

            <Pager total={total}
                   pageSize={part.config.first || 25}
                   pageIndex={pageIndex}
                   url={getUrl(meta.path)}/>
            <PropsView {...props}/>
        </>)
};

export default MarketNewsArchive;


