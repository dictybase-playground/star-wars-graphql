import { RefObject } from "react"

interface ListDisplayWrapperProps {
  root: RefObject<HTMLDivElement>,
  children: JSX.Element | JSX.Element[]
}
export default function ListDisplayWrapper({ root: rootRef, children }: ListDisplayWrapperProps): JSX.Element {
  return (
    <div
      ref={rootRef}
      style={{ overflowY: "scroll", height: "150px", width: "30%" }}
    >
      {children}
    </div>
  )
}
