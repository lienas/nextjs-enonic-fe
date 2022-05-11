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
              imageAttachment {
                ... on media_Image {
                  imageUrl(scale: "width(150)", type: absolute)
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
export default getMarketNewsByPath;
