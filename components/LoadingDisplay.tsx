
interface LoadingDisplayProps {
  loading: boolean
}

export default function LoadingDisplay({ loading }: LoadingDisplayProps): JSX.Element {
  let component = <></>
  if (loading) {
    component = <h2>....Loading data....</h2>
  }
  return component
}
