package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// Health structure with status
type Health struct {
	Status string `json:"status"`
}

// HealthCheck checks for the status of the server
func HealthCheck(ctx echo.Context) error {
	health := &Health{
		Status: "ok",
	}

	return ctx.JSON(http.StatusOK, health)
}
