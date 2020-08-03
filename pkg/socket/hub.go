package socket

type Hub struct {
	clients    map[string]map[*Client]bool
	broadcast  chan Message
	register   chan *Client
	unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		broadcast:  make(chan Message),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[string]map[*Client]bool),
	}
}

func (h *Hub) Run(rID string) {
	for {
		select {
		case client := <-h.register:
			newClient := h.clients[client.room]
			if newClient == nil {
				newClient = make(map[*Client]bool)
				h.clients[client.room] = newClient
			}
			h.clients[client.room][client] = true
			// h.clients[client] = true
		case client := <-h.unregister:
			conn := h.clients[client.room]
			if conn != nil {
				if _, ok := conn[client]; ok {
					delete(conn, client)
					close(client.send)

					if len(conn) == 0 {
						delete(h.clients, client.room)
					}
				}
			}
		case m := <-h.broadcast:
			conn := h.clients[m.room]
			for client := range conn {
				select {
				case client.send <- m.data:
				default:
					close(client.send)
					delete(conn, client)
					if len(conn) == 0 {
						delete(h.clients, client.room)
					}
				}
			}
		}
	}
}
