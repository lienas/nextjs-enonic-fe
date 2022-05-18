import React, {useEffect, useState} from 'react';
import {Box, Heading} from "@chakra-ui/react";
import {PartProps} from "../../_enonicAdapter/views/BasePart";
import PropsView from "../ui/debug/Props";
import Pager from "../ui/Pager";
import {getUrl} from "../../_enonicAdapter/utils";
import NewsCards from "../views/NewsCards";
import MarketNewsArchiveFilter from "./MarketNewsArchiveFilter";
import {getMarketNewsByPath} from "../queries/getMarketNewsByPath";
import {useRouter} from "next/router";
import {calculateCursor, parseString} from "../../utils/helpers";
import {isArray} from "@chakra-ui/utils";

const MarketNewsArchive = (props: PartProps) => {

    const router = useRouter();
    const {meta, data, part} = props;
    const {term} = router.query;
    //console.log("Router-Object %s", JSON.stringify(router, null, 2));

    const [newsData, setNewsData] = useState(data.queryConnection);
    const [filter, setFilter] = useState(term as string || '');
    const [isFilterActive, setIsFilterActive] = useState(term !== undefined);
    const pageSize = part.config?.first || 25;

    let news = newsData?.edges;

    const total: number = newsData?.totalCount;
    //let pageIndex: number = data?.pageIndex;

    let pageIndex: number;
    const pageIndexFromQuery = router.query.page;
    if (pageIndexFromQuery === undefined || isArray(pageIndexFromQuery)) {
        pageIndex = 1;
    } else {
        pageIndex = parseInt(pageIndexFromQuery)
    }

    const getVars = () => {

        const {page} = router.query;

        console.log("getVARS: pageIndex = %s, pageSize= %s, page = %s ", pageIndex, pageSize, page);
        const offset = calculateCursor({pageIndex: page ? page : '1', pageSize: pageSize});

        return {
            "path": meta.path,
            "query": `_path LIKE '*${meta.path}*' AND type LIKE '*marketNews' AND fulltext('*','${filter && filter.length > 0 ? filter : ''}','AND')`,
            "sort": "data.pubDate DESC",
            "offset": offset,
            "first": pageSize
        }
    }

    const fetchNews = async () => {
        // todo: get from envelope
        const API_URL = "http://localhost:8080/site/next/draft/hmdb/_graphql"
        let resp;
        let total; // total from client fetch
        try {
            resp = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    query: getMarketNewsByPath,
                    variables: getVars()
                })
            });

            const filteredData: any = await resp.json();

            //if (filteredData.data.guillotine.queryConnection.totalCount > 0) {
            //console.log("Set filtered data .......");
            total = filteredData.data.guillotine.queryConnection.totalCount
            setNewsData(filteredData.data.guillotine.queryConnection);
            //}

        } catch (e: any) {
            console.error("Failed to fetch data %s", e.errorMessage);
        }

        const queryTerms = new URLSearchParams();
        if (Math.ceil(total / pageSize) < pageIndex) {
            queryTerms.append('page', '1');
        } else {
            queryTerms.append('page', String(pageIndex));
        }
        if (filter.length > 0 && !isArray(filter)) {
            queryTerms.append('term', filter);
        }

        await router.push(router.query.contentPath + '/?' + queryTerms.toString(), undefined, {shallow: true});

    }

    useEffect(() => {
        // console.log("useEffect in MarketNewsArchive with term = %s", term);
        //setIsFilterActive(!!(term && term?.length > 0));

        if (isFilterActive) {
            console.log("fetch from client");
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
            <MarketNewsArchiveFilter filterNews={setFilter}
                                     setIsActive={setIsFilterActive}
                                     isActive={isFilterActive}/>
            <Pager total={total}
                   pageSize={part.config.first || 25}
                   pageIndex={pageIndex}
                   url={getUrl(meta.path)}
                   filter={filter}
            />
            <NewsCards news={news}/>

            <Pager total={total}
                   pageSize={part.config.first || 25}
                   pageIndex={pageIndex}
                   url={getUrl(meta.path)}
                   filter={filter}
            />
            <PropsView {...props}/>
        </>)
};

export default MarketNewsArchive;


