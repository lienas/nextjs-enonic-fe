import {Context} from "../../pages/[[...contentPath]]";
import {VariablesGetterResult} from "../../_enonicAdapter/ComponentRegistry";

const getMarketNewsByPath = `
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

export const getMarketNewsArchive = {
    query: getMarketNewsByPath,
    variables: function (path: string, context?: Context, config?: any): VariablesGetterResult {
        //todo: make helper function for that
        let pageIndex = context?.query?.page;
        let pageSize = config?.first || 25;

        if (pageIndex && Array.isArray(pageIndex)) {
            pageIndex = pageIndex[0];
        } else if (!pageIndex) {
            pageIndex = "1"
        }

        let offset = (parseInt(pageIndex) - 1) * parseInt(pageSize);
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

