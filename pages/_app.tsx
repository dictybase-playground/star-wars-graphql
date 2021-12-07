import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client"
import useGraphqlCient from '../lib/graphql-client'

function MyApp({ Component, pageProps }: AppProps) {
  const client = useGraphqlCient()
  if (!client) return <h2>starting the app</h2>
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
