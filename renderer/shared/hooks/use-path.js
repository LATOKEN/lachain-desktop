import {useEffect, useState} from 'react'

export function usePath() {
  const [path, setPath] = useState(null)
  useEffect(() => {
    setPath(window.location.pathname + window.location.search)
  }, [])
  return {path}
}
