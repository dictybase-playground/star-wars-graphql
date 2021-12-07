import type { NextPage } from "next"
import { gql, useQuery } from "@apollo/client"
import { useRef } from "react"
import useIntersectionObserver from "../lib/useIntersectionObserver"
import LoadingDisplay from "../components/LoadingDisplay"
import ErrorDisplay from "../components/ErrorDisplay"
import ListDisplay from "../components/ListDisplay"
import ListDisplayWrapper from "../components/ListDisplayWrapper"

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
const queryVars = { variables: { first: 6, after: null } }

const Home: NextPage = () => {
    const rootRef = useRef<HTMLDivElement>(null)
    // this ref(dom) gets observed by the intersection observer
    // and should the children of root ref
    const targetRef = useRef<HTMLParagraphElement>(null)
    const { loading, error, data, fetchMore } = useQuery(GET_ALL_PLANETS, queryVars)
    // this callback has to be inside the component
    // because of the lexical scope of data variable
    const onIntersection = ([entry]: IntersectionObserverEntry[]) => {
        const { hasNextPage, endCursor } = data.allPlanets.pageInfo
        if (!entry.isIntersecting) return
        if (!hasNextPage) return
        fetchMore({ variables: { after: endCursor } })
    }
    // basic intersection observer for triggering loading of more data
    // the callback above gets called on every intersection
    useIntersectionObserver({
        target: targetRef,
        option: { root: rootRef.current },
        onIntersection: onIntersection
    })
    return (
        <>
            <h1>Star wars planets</h1>
            <LoadingDisplay loading={loading} />
            <ErrorDisplay error={error} />
            <ListDisplayWrapper root={rootRef}>
                <ListDisplay data={data} target={targetRef} />
            </ListDisplayWrapper>
        </>
    )
}
export default Home
