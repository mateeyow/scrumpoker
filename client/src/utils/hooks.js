import { useEffect, useState, useRef } from 'react'
import fetch from 'utils/fetch'
import WS from './ws'
import { noop } from './utils'

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

export const useWS = (room) => {
  const socket = useRef({})
  useEffect(() => {
    if (room?.roomId) {
      socket.current = new WS(room.roomId)

      return function cleanup() {
        socket.current.close()
      }
    }

    return noop
  }, [room])

  return socket.current
}
