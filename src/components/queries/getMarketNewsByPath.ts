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
    const pageIndex = context?.query?.page || 1;
    const pageSize = config?.first || 25;
    const term = context?.query?.term;

    const base64data = calculateCursor({
        pageIndex: pageIndex,
        pageSize: parseInt(pageSize)
    });

    let query = `_path LIKE '*${path}*' AND type LIKE '*marketNews'`;
    if (term) query += ` AND fulltext('*','${term}','AND')`;
    console.log("query = %s", query);

    return {
        path: path,
        "query": query,
        "sort": "data.pubDate DESC",
        "offset": base64data,
        "first": pageSize
    }
}

export const getMarketNewsArchive = {
    query: getMarketNewsByPath,
    variables: varCallback
}


