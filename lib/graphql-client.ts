import { ApolloClient, InMemoryCache, NormalizedCacheObject, FieldFunctionOptions } from "@apollo/client"
import { persistCache, LocalForageWrapper } from "apollo3-cache-persist"
import localForage from "localforage"
import { useEffect, useState } from "react";

interface PlanetProps {
  id: string,
  name: string
}

interface PageInfoProps {
  endCursor?: string,
  hasNextPage: boolean
}

interface AllPlanetsProps {
  planets: Array<PlanetProps>,
  pageInfo: PageInfoProps
}

interface CachedPlanetsProps {
  planets: { [key: string]: PlanetProps },
  pageInfo: Array<PageInfoProps>
}

const managePlanetCache = () => ({
  merge(existing: CachedPlanetsProps, incoming: AllPlanetsProps, { readField }: FieldFunctionOptions) {
    let mergedPlanets = existing ? { ...existing.planets } : {}
    let mergedPageInfo = existing ? existing.pageInfo : []
    if (!incoming) return { pageInfo: mergedPageInfo, planets: Object.values(existing.planets) }
    incoming.planets.forEach((p: any) => {
      const id = readField("id", p)
      if (typeof id === "string") mergedPlanets[id] = p
    })
    const isPresent = mergedPageInfo.find(info => info.endCursor === incoming.pageInfo.endCursor)
    return {
      pageInfo: isPresent ? mergedPageInfo : [...mergedPageInfo, incoming.pageInfo],
      planets: mergedPlanets
    }
  },
  read(existing: CachedPlanetsProps) {
    if (existing) {
      return { 
        pageInfo: existing.pageInfo[existing.pageInfo.length - 1], 
        planets: Object.values(existing.planets) 
      }
    }
  }
})


// const STAR_WARS_KEY = "star-wars-apollo-cache-persist"
const useGraphqlCient = (): ApolloClient<NormalizedCacheObject> | undefined => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  useEffect(() => {
    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPlanets: managePlanetCache()
          }
        }
      }
    })
    const initializeCache = async () => {
      await persistCache({
        cache,
        storage: new LocalForageWrapper(localForage),
      })
    }
    initializeCache()
    setClient(new ApolloClient({
      uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "cache-and-network",
          notifyOnNetworkStatusChange: true
        }
      }
    }))
  }, [])
  return client
}

export default useGraphqlCient
