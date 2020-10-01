const getUrl = (url) => {
  const { host, protocol } = window.location
  const wsProtocol = protocol === 'http:' ? 'ws' : 'wss'
  const uri = host.includes('localhost') ? 'localhost:1323' : `api.${host}`
  return `${wsProtocol}://${uri}/ws/${url}`
}

class WS {
  constructor(url) {
    this.url = url
    this.connect()
    return this.ws
  }

  connect() {
    const url = getUrl(this.url)
    this.ws = new WebSocket(url)
  }
}

export default WS
