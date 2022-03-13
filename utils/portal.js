import { useEffect, useRef } from 'react'

export const usePortal = () => {
  const portal = useRef(document.createElement('div'))

  useEffect(() => {
    document.body.appendChild(portal.current)
  }, [])

  return portal
}