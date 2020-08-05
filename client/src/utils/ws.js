import { noop } from './utils'

const getUrl = (url) => {
  const { host, protocol } = window.location
  const wsProtocol = protocol === 'http:' ? 'ws' : 'wss'
  return `${wsProtocol}://${host}/ws/${url}`
}

class WS {
  constructor(url) {
    this.url = url
    this.connect()
    this.onmessage = noop
    this.onopen = noop
    this.onerror = noop
    this.onclose = noop
  }

  connect() {
    const url = getUrl(this.url)
    this.ws = new WebSocket(url)
    this.ws.onopen = () => this.onopen()
    this.ws.onmessage = (evt) => this.onmessage(evt.data)
    this.ws.onerror = (err) => this.onerror(err)
    this.ws.onclose = () => this.onclose()
  }

  close() {
    this.ws.close()
  }

  send(data) {
    this.ws.send(data)
  }
}

export default WS
