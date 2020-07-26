package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/mateeyow/scrumpoker/controllers"
)

func main() {
	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes
	e.GET("/healthz", controllers.HealthCheck)
	e.GET("/ws", controllers.Websocket)

	// Start server
	e.Logger.Fatal(e.Start("127.0.0.1:1323"))
}
