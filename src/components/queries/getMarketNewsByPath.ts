const getMarketNewsByPath = `
query ($query: String, $sort: String) {
  guillotine {
    query(query: $query, sort: $sort, first: 25) {
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
`
export default getMarketNewsByPath;
