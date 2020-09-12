package socket

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
	"github.com/mateeyow/scrumpoker/models"
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

		var msg WSData
		if err = json.Unmarshal(message, &msg); err != nil {
			utils.LogError("Error converting json", err)
		}

		switch msg.Action {
		case WSActionJoin:
			var (
				name   string
				uuid   string
				exists bool
			)

			if name, exists = msg.Data["name"].(string); !exists {
				// TODO: Please handle error
				fmt.Printf("Handle error here\n")
			}
			if uuid, exists = msg.Data["uuid"].(string); !exists {
				// TODO: Please handle error
				fmt.Printf("Handle error here\n")
			}

			prtcpnt := models.NewParticipant(name, uuid)

			room := &models.Room{}
			room, err = room.FindOneOrNil(c.Room)
			if err != nil {
				// TODO: Do something with error
			}

			if room == nil {
				// TODO: Do something if no room
				fmt.Printf("NO ROOM\n\n")
				return
			}

			if !room.HasParticipant(prtcpnt.UUID) {
				room.Participants = append(room.Participants, *prtcpnt)
				err = room.Update()
				if err != nil {
					fmt.Printf("err: %#v\n\n", err)
					// TODO: Do something with error
				}
			} else {
				idx, foundPrtcpnt := room.FindParticipant(prtcpnt.UUID)

				if foundPrtcpnt.UUID != "" && foundPrtcpnt.Name != prtcpnt.Name {
					// Edit the participant
					room.Participants[idx] = *prtcpnt
					err = room.Update()
					if err != nil {
						fmt.Printf("err: %#v\n\n", err)
						// TODO: Do something with error
					}
				}
			}

			// fmt.Printf("ROOM: %T\n\n", fmt.Sprintf("%v", room))
			resByte := new(bytes.Buffer)
			res := WSResponse{
				Action: WSActionJoin,
				Data:   room.Participants,
			}
			json.NewEncoder(resByte).Encode(res)
			m := Message{data: resByte.Bytes(), room: c.Room}
			c.Hub.Broadcast <- m
		case WSActionVote:
			uuid, exists := msg.Data["uuid"].(string)
			if !exists {
				// TODO: Please handle error
				fmt.Printf("Handle error here\n")
			}

			room := &models.Room{}
			room, err = room.FindOneOrNil(c.Room)
			if err != nil || room == nil {
				// TODO: Do something with error
			}

			idx, participant := room.FindParticipant(uuid)
			score, exists := msg.Data["score"].(string)
			if !exists {
				// TODO: Please handle error
				fmt.Printf("Handle error here\n")
			}
			participant.Score = score
			room.Participants[idx] = participant

			resByte := new(bytes.Buffer)
			res := WSResponse{
				Action: WSActionVote,
				Data:   participant,
			}
			json.NewEncoder(resByte).Encode(res)
			m := Message{data: resByte.Bytes(), room: c.Room}
			c.Hub.Broadcast <- m
		default:
			fmt.Printf("\n\nNOT A PROPER ACTION %s\n\n", msg.Action)
		}

		// m := Message{data: bytes.TrimSpace(bytes.Replace(message, newline, space, -1)), room: c.Room}
		// c.Hub.Broadcast <- m
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
