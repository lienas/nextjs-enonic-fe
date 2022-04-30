export const mainNavigationQuery = `
query($path:ID!){
  guillotine {
    getMenuItems(level: 1, currentContent: $path) {
      id
      title
      path
      isActive      
    }   
  }
}`;
