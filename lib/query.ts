import { ApolloError, gql, ApolloQueryResult, FetchMoreQueryOptions, QueryResult } from "@apollo/client"


const GET_ALL_PLANETS = gql`
  query GetPlanetsList($first: Int, $after: String) { 
    allPlanets(first:$first, after:$after) {
      planets {
        id
        name
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

interface FetchMoreFn {
  (fetchMoreOptions: FetchMoreQueryOptions<{
    first?: number,
    after: string
  }>): Promise<ApolloQueryResult<QueryResult>>;
}

interface PlanetQueryResponse {
  loading: boolean,
  error: ApolloError | undefined,
  data: any,
  fetchMore: FetchMoreFn
}
