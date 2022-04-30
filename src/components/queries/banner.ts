import {Context} from "../../pages/[[...contentPath]]";
import {VariablesGetterResult} from "../../_enonicAdapter/ComponentRegistry";

const bannerQuery = `
query ($path: ID!) {
  guillotine {
    get(key: $path) {
      _id
      type
      ... on media_Image {
        imageUrl(type: absolute, scale: "block(1024, 250)")
      }
    }
  }
}
`
const variables = function (path: string, context?: Context, config?: any): VariablesGetterResult {

    //console.log("pageIndex in variables callback %s", pageIndex);

    return {
      path: config.elements.image ? config.elements.image : ""
    }
}

export const getBannerUrl = {
    query: bannerQuery,
    variables: variables
}
