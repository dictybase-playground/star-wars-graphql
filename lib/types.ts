import { RefObject } from "react"

export namespace AppTypes {
  export interface UseIntersectionObserverProps {
    target: RefObject<Element>,
    option?: IntersectionObserverInit,
    onIntersection: IntersectionObserverCallback
  }

  export interface LoadingDisplayProps {
    loading: boolean
  }
}
