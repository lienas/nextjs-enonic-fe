export const getSourceAgg = `
query ($query: String!) {
  guillotine {
    queryConnection(query: $query, 
      aggregations: {name: "bySource", 
        terms: {
          field: "data.source", 
          order: "docCount DESC", 
          minDocCount: 1
        }
      }) {
      totalCount
      aggregationsAsJson
    }
  }
}
`
