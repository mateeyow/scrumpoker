package controllers

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/Kamva/mgm/v3"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/mateeyow/scrumpoker/models"
	"github.com/mateeyow/scrumpoker/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
)

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
)

func Websocket(ctx echo.Context) (err error) {
	rID := ctx.Param("roomId")
	upgrader.CheckOrigin = func(r *http.Request) bool {
		host := r.Host
		if strings.Contains(host, "localhost") || strings.Contains(host, "mateeyow.com") {
			return true
		}

		return false
	}

	ws, err := upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	defer ws.Close()
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

	fmt.Println(room)

	for {
		// Read
		_, msg, err := ws.ReadMessage()
		if err != nil {
			ctx.Logger().Error(err)
		}
		fmt.Printf("%s\n", msg)

		// Write
		err = ws.WriteMessage(websocket.TextMessage, []byte(msg))
		if err != nil {
			ctx.Logger().Error(err)
		}
	}
}
