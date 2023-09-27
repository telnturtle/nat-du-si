import { useRef } from 'react'

export const useCss = <T,>(x: T): T => {
  return useRef(x).current
}
