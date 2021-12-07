import { RefObject } from "react"

interface ListDisplayProps {
  data: any,
  target: RefObject<HTMLParagraphElement>
}

export default function ListDisplay({ data, target: targetRef }: ListDisplayProps): JSX.Element {
  let component = <></>
  if (data) {
    const { pageInfo: { hasNextPage }, planets } = data.allPlanets
    component = planets.map((pt: any, i: number) => {
      if (i === planets.length - 1) {
        if (hasNextPage) return <p key={pt.id} ref={targetRef}>{pt.name}</p>
      }
      return <p key={pt.id}>{pt.name}</p>
    })
  }
  return component
}
