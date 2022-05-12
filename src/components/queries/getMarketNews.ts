import {APP_NAME_UNDERSCORED} from '../../_enonicAdapter/utils'

const getMarketNews = `
query ($path: ID!) {
  guillotine {
    get(key: $path) {
      displayName
      ... on com_enonic_app_nextjsdemo_MarketNews {
        data {
          title
          content(processHtml: {type: absolute}) {
            processedHtml
            links {
              ref
              media {
                content {
                  _id
                }
              }
            }
          }
          description
          pubDate
          source
          link
          image
          imageAttachment {
            ... on media_Image {
              xAsJson
              imageUrl_m: imageUrl(scale: "width(300)", type: absolute)
              imageUrl_s: imageUrl(scale: "width(150)", type: absolute)
            }
          }
        }
      }
      parent {
        _path(type: siteRelative)
      }
    }
  }
}`;

export default getMarketNews;
