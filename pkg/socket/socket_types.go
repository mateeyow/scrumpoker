package socket

import "github.com/gorilla/websocket"

type Hub struct {
	Clients    map[string]map[*Client]bool
	Broadcast  chan Message
	Register   chan *Client
	Unregister chan *Client
}

type Message struct {
	data []byte
	room string
}

type Client struct {
	Hub  *Hub
	Conn *websocket.Conn
	Send chan []byte
	Room string
}

// WSAction is the type of message the client sent
type WSAction string

// List of values that WSAction can take.
const (
	WSActionJoin  WSAction = "join"
	WSActionStart WSAction = "start"
	WSActionReset WSAction = "reset"
)

// WSData will be the primary message being circulated among the scrum master
// and the scrum members
type WSData struct {
	Action WSAction               `json:"action"`
	Data   map[string]interface{} `json:"data"`
}
