package socket

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
	"github.com/mateeyow/scrumpoker/pkg/utils"
)

func NewHub() *Hub {
	return &Hub{
		Broadcast:  make(chan Message),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[string]map[*Client]bool),
	}
}

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 1024
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

func (c *Client) ReadPump() {
	defer func() {
		c.Hub.Unregister <- c
		c.Conn.Close()
	}()
	c.Conn.SetReadLimit(maxMessageSize)
	c.Conn.SetReadDeadline(time.Now().Add(pongWait))
	c.Conn.SetPongHandler(func(string) error { c.Conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := c.Conn.ReadMessage()

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		fmt.Printf("message: %s\n\n", message)
		var msg WSData
		if err = json.Unmarshal(message, &msg); err != nil {
			utils.LogError("Error converting json", err)
		}

		switch msg.Action {
		case WSActionJoin:
			fmt.Printf("\n\n THIS IS A REGISTER! \n\n")
		default:
			fmt.Printf("\n\nNOT A PROPER ACTION %s\n\n", msg.Action)
		}

		m := Message{data: bytes.TrimSpace(bytes.Replace(message, newline, space, -1)), room: c.Room}
		c.Hub.Broadcast <- m
	}
}

func (c *Client) WritePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.Send:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			n := len(c.Send)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-c.Send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			newClient := h.Clients[client.Room]
			if newClient == nil {
				newClient = make(map[*Client]bool)
				h.Clients[client.Room] = newClient
			}
			h.Clients[client.Room][client] = true
		case client := <-h.Unregister:
			conn := h.Clients[client.Room]
			if conn != nil {
				if _, ok := conn[client]; ok {
					delete(conn, client)
					close(client.Send)

					if len(conn) == 0 {
						delete(h.Clients, client.Room)
					}
				}
			}
		case m := <-h.Broadcast:
			conn := h.Clients[m.room]
			for client := range conn {
				select {
				case client.Send <- m.data:
				default:
					close(client.Send)
					delete(conn, client)
					if len(conn) == 0 {
						delete(h.Clients, client.Room)
					}
				}
			}
		}
	}
}
