import { useEffect, useState } from 'react'
import fetch from 'utils/fetch'

export const useFetch = (url, method = 'get', data) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch[method](url, data)
      .then((res) => {
        setResponse(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url, data, method])

  return [response, loading, error]
}

export const noop = () => {}
