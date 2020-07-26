package controllers

import (
	"fmt"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var upgrader = websocket.Upgrader{}

func Websocket(ctx echo.Context) error {
	ws, err := upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

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
