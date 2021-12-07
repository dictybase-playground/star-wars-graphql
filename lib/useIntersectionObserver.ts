import { useEffect, useRef, RefObject } from "react"

// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

interface UseIntersectionObserverProps {
  target: RefObject<Element>,
  option?: IntersectionObserverInit,
  onIntersection: IntersectionObserverCallback
}

const useIntersectionObserver = (props: UseIntersectionObserverProps): void => {
  const { target, option, onIntersection } = props
  const observerRef = useRef<IntersectionObserver>()

  // set up the intersection observer
  // callback fn that adds intersection observer to observer ref
  // and observes the target ref if it exists
  // https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780#
  useEffect(() => {
    if (!target.current) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(onIntersection, option)
    observerRef.current.observe(target.current)
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [option, target, onIntersection])
}

export default useIntersectionObserver
