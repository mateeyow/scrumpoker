package models

import (
	"time"

	"github.com/Kamva/mgm/v3"
	"github.com/mateeyow/scrumpoker/pkg/utils"
)

type Room struct {
	mgm.DefaultModel `bson:",inline"`
	RoomID           string     `json:"roomId" bson:"roomId"`
	Title            string     `json:"title" bson:"title"`
	Type             string     `json:"type" bson:"pages"`
	DeletedAt        *time.Time `json:"deleted_at" bson:"deleted_at"`
}

func NewRoom(title, roomType string) (error, *Room) {
	rid, err := utils.GenerateRoomID()
	if err != nil {
		return err, nil
	}

	return nil, &Room{
		RoomID: rid,
		Title:  title,
		Type:   roomType,
	}
}
