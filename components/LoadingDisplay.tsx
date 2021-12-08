import { AppTypes } from "../lib/types"

export default function LoadingDisplay({ loading }: AppTypes.LoadingDisplayProps): JSX.Element {
  let component = <></>
  if (loading) {
    component = <h2>....Loading data....</h2>
  }
  return component
}
