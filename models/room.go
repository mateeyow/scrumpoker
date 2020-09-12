package models

import (
	"strings"
	"time"

	"github.com/Kamva/mgm/v3"
	"github.com/mateeyow/scrumpoker/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
)

type Room struct {
	mgm.DefaultModel `bson:",inline"`
	RoomID           string        `json:"roomId" bson:"roomId"`
	Title            string        `json:"title" bson:"title"`
	Type             string        `json:"type" bson:"pages"`
	HasStarted       bool          `json:"hasStarted" bson:"hasStarted"`
	DeletedAt        *time.Time    `json:"deleted_at" bson:"deleted_at"`
	Participants     []Participant `json:"participants" bson:"participants"`
}

type Participant struct {
	Name  string `json:"name"`
	UUID  string `json:"uuid"`
	Score string `json:"score,omitempty"`
}

func (rm *Room) FindOneOrNil(id string) (*Room, error) {
	coll := mgm.Coll(rm)

	if err := coll.First(bson.M{"roomId": id, "deleted_at": nil}, rm); err != nil {
		if strings.Contains(err.Error(), "no documents in result") {
			return nil, nil
		}

		return rm, err
	}

	return rm, nil
}

func (rm *Room) HasParticipant(uuid string) bool {
	for _, val := range rm.Participants {
		if val.UUID == uuid {
			return true
		}
	}

	return false
}

func (rm *Room) Update() error {
	return mgm.Coll(rm).Update(rm)
}

// FindParticipant finds the participant given a uuid in an slice of participants
func (rm *Room) FindParticipant(uuid string) (idx int, part Participant) {
	for i, val := range rm.Participants {
		if val.UUID == uuid {
			part = val
			idx = i
			break
		}
	}

	return idx, part
}

func NewRoom(title, roomType string) (*Room, error) {
	rid, err := utils.GenerateRoomID()
	if err != nil {
		return nil, err
	}

	return &Room{
		RoomID:       rid,
		Title:        title,
		Type:         roomType,
		Participants: []Participant{},
	}, err
}

func NewParticipant(name, uuid string) *Participant {
	return &Participant{
		Name: name,
		UUID: uuid,
	}
}
