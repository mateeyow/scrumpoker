package controllers

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/Kamva/mgm/v3"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/mateeyow/scrumpoker/models"
	"github.com/mateeyow/scrumpoker/pkg/socket"
	"github.com/mateeyow/scrumpoker/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
)

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
)

func Websocket(hub *socket.Hub, ctx echo.Context) (err error) {
	rID := ctx.Param("roomId")
	upgrader.CheckOrigin = func(r *http.Request) bool {
		host := r.Host
		fmt.Printf("host: %#v\n\n", host)
		if strings.Contains(host, "localhost") || strings.Contains(host, "mateeyow.com") {
			return true
		}

		return false
	}

	ws, err := upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)

	if err != nil {
		logger.Error(utils.LogError("Error initializing websocket", err))
		ctx.Error(err)
		return err
	}

	room := &models.Room{}
	coll := mgm.Coll(room)

	if err = coll.First(bson.M{"roomId": rID, "deleted_at": nil}, room); err != nil {
		logger.Error(utils.LogError("Error getting room details "+rID, err))
		ctx.Error(err)
		return
	}

	client := &socket.Client{
		Hub:  hub,
		Conn: ws,
		Send: make(chan []byte, 256),
		Room: rID,
	}

	client.Hub.Register <- client
	go client.WritePump()
	go client.ReadPump()

	return nil
}
