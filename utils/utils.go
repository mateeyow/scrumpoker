package utils

import (
	"fmt"

	"github.com/teris-io/shortid"
)

// GenerateRoomID generates a url friendly shortid
func GenerateRoomID() (string, error) {
	return shortid.Generate()
}

// LogError formats the message with the error message
func LogError(msg string, err error) string {
	return fmt.Sprintf("%s: %v", msg, err)
}
