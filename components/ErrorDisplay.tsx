import { ApolloError } from "@apollo/client"

interface ErrorDisplayProps {
  error: ApolloError | undefined
}


export default function ErrorDisplay({ error }: ErrorDisplayProps): JSX.Element {
  let component = <></>
  if (error) {
    component = <h2>Error..... {error.message}</h2>
  }
  return component
}
