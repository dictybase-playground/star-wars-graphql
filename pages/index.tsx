import type { NextPage } from "next"
import { gql, useQuery } from "@apollo/client";

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

const fetchMoreHandler = (hasNextPage, endCursor, fetchMoreFn) => {
  if (!hasNextPage) return
  fetchMoreFn({ variables: { after: endCursor } })
}

const Home: NextPage = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_ALL_PLANETS, {
    variables: { first: 5, after: null },
  })
  if (loading) return <h2>Loading data.... </h2>
  if (error) return <h2>Error!!! .... {error.message}</h2>
  const { hasNextPage, endCursor } = data.allPlanets.pageInfo
  console.log("endcursor ",endCursor)
  return (
    <>
      <h1>Star wars planets</h1>
      {
        data.allPlanets.planets.map((planet: any) => (
          <p key={planet.id}>{planet.name}</p>
        ))}
      <button
        type="button"
        onClick={() => fetchMoreHandler(hasNextPage, endCursor, fetchMore)}
      > <b>Load More</b>
      </button>
    </>
  )
}

export default Home
