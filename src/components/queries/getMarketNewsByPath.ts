import {Context} from "../../pages/[[...contentPath]]";
import {VariablesGetterResult} from "../../_enonicAdapter/ComponentRegistry";
import {calculateCursor} from "../../utils/helpers";

export const getMarketNewsByPath = `
query ($query: String!, $sort: String, $offset: String, $first: Int) {
  guillotine {
    queryConnection(query: $query, sort: $sort, first: $first, after: $offset) {
      totalCount
      edges {
        cursor
        node {
          displayName
          createdTime
          _path
          ... on com_enonic_app_nextjsdemo_MarketNews {
            data {
              source
              pubDate
              description
              link
              imageAttachment {
                ... on media_Image {
                  imageUrl(scale: "width(300)", type: absolute)
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export async function newsArchiveProcessor(common: any, context?: Context): Promise<any> {
    common.pageIndex = context?.query?.page || 1;
    return common;
}

const varCallback = (path: string, context?: Context, config?: any): VariablesGetterResult => {
    let pageIndex = context?.query?.page || 1;
    let pageSize = config?.first || 25;

    const base64data = calculateCursor({
        pageIndex: pageIndex,
        pageSize: parseInt(pageSize)
    });


    return {
        path: path,
        "query": `_path LIKE '*${path}*' AND type LIKE '*marketNews'`,
        "sort": "data.pubDate DESC",
        "offset": base64data,
        "first": pageSize
    }
}

export const getMarketNewsArchive = {
    query: getMarketNewsByPath,
    variables: varCallback
}


