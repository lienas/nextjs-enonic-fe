import React, {useEffect, useState} from "react"
import {PartProps} from '../../_enonicAdapter/views/BasePart';
import {Context} from '../../pages/[[...contentPath]]';
import {VariablesGetterResult} from '../../_enonicAdapter/ComponentRegistry';
import {CONTENT_API_URL, getUrl} from '../../_enonicAdapter/utils'
import PropsView from "../views/Props";
import NextLink from "next/link";
import {Button, Heading, Link, ListItem, UnorderedList} from "@chakra-ui/react";
import Pager from "../ui/Pager";

const ChildList = (props: PartProps) => {

    const {data, meta, common, part} = props;
    const children = data.get.children;
    const totalCount = data.getChildrenConnection.totalCount;
    //const pageIndex = data.pageIndex;
    const [childs, setChilds] = useState(children);
    const [pageIndex, setPageIndex] = useState(data.pageIndex);

    console.log("Common passed to childList = %s", common);
    console.log("Meta passed to childList = %s", meta);
    console.log("pageIndex = %s", pageIndex);

    useEffect(() => {
        setChilds(data.get.children);
        setPageIndex(data.pageIndex);
    }, [data])

    if (!children || children.length === 0) {
        return null;
    }

    return (
        <main style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem`,
        }}>
            <Heading as={"h1"} color={"limegreen"}>{totalCount} Element</Heading>
            {
                childs &&
                <UnorderedList>{
                    childs.map((child: any, i: number) => {

                            return (
                                <ListItem key={i}>
                                    <NextLink href={getUrl(child._path)} passHref>
                                        <Link>{child.displayName}</Link>
                                    </NextLink>
                                </ListItem>

                            )
                        }
                    )

                }</UnorderedList>
            }

            <Pager total={totalCount} pageSize={part.config.first || 10} pageIndex={pageIndex} url={getUrl(meta.path)}/>
            <PropsView {...props} />
        </main>
    );
};

export default ChildList;

const query = `query ($path: ID!, $order: String, $first: Int, $after:Int) {
              guillotine {
                getSite {
                  displayName
                }
                 getChildrenConnection(key: $path){
                  totalCount
                }
                get(key: $path) {
                  displayName
                  children(sort: $order, first: $first, offset:$after) {
                    _path(type: siteRelative)
                    _id
                    displayName
                  }
                }
              }
            }`;

export const getChildList = {
    query,
    variables: function (path: string, context?: Context, config?: any): VariablesGetterResult {
        let pageIndex = context?.query?.page;
        let pageSize = config?.first || 10;

        if (pageIndex) {
            pageIndex = pageIndex[0];
        } else {
            pageIndex = "1"
        }
        const offset = (Number.parseInt(pageIndex) - 1) * pageSize;

        //console.log("pageIndex in variables callback %s", pageIndex);

        return {
            path,
            order: config?.sorting,
            first: config?.first,
            after: offset
        }
    }
};

export async function childListProcessor(common: any, context?: Context): Promise<any> {
    common.modifiedBy = 'childListProcessor';
    common.pageIndex = context?.query?.page || 1;
    return common;
}
