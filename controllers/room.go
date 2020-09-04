package controllers

import (
	"net/http"
	"strings"
	"time"

	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"github.com/mateeyow/scrumpoker/models"
	"github.com/mateeyow/scrumpoker/pkg/utils"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
)

var logger = log.WithFields(log.Fields{"folder": "controllers"})

// CreateRoom API for creating new SCRUM room
func CreateRoom(ctx echo.Context) (err error) {
	title := ctx.FormValue("title")
	roomType := ctx.FormValue("type")

	room, err := models.NewRoom(title, roomType)
	if err != nil {
		logger.Error(utils.LogError("Error generating new room", err))
		return
	}

	if err = ctx.Bind(room); err != nil {
		logger.Error(utils.LogError("Error binding form data", err))
		return
	}

	if err = mgm.Coll(room).Create(room); err != nil {
		logger.Error(utils.LogError("Error creating room", err))
		return err
	}

	return ctx.JSON(http.StatusOK, room)
}

// GetRoom API handler to get the room data
func GetRoom(ctx echo.Context) (err error) {
	rID := ctx.Param("roomId")

	room := &models.Room{}
	coll := mgm.Coll(room)

	err = coll.First(bson.M{"roomId": rID, "deleted_at": nil}, room)
	if err != nil {
		if strings.Contains(err.Error(), "no documents in result") {
			ctx.NoContent(http.StatusNotFound)
			return nil
		}

		logger.Error(utils.LogError("Error getting room details "+rID, err))
		ctx.Error(err)
		return
	}

	return ctx.JSON(http.StatusOK, room)
}

func DeleteRoom(ctx echo.Context) (err error) {
	rID := ctx.Param("roomId")

	room := &models.Room{}
	coll := mgm.Coll(room)

	if err = coll.First(bson.M{"roomId": rID, "deleted_at": nil}, room); err != nil {
		logger.Error(utils.LogError("Error getting room details "+rID, err))
		ctx.Error(err)
		return
	}

	now := time.Now().UTC()
	room.DeletedAt = &now

	if err = coll.Update(room); err != nil {
		logger.Error(utils.LogError("Error updating room"+rID, err))
		ctx.Error(err)
		return
	}

	return ctx.NoContent(http.StatusOK)
}
