export const mainNavigationQuery = `
query ($path: ID!) {
  guillotine {
   get(key:$path) {
      displayName
      _id
      type
      dataAsJson
      xAsJson
    }
    getSite {
      displayName
      _path
    }
    getMenuItems(level: 3, currentContent: $path) {
        id
        title
        path
        isActive
      children {
        id
        title
        path
        isActive
      }
    }
  }
}`;
