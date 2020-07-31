package main

import (
	mgm "github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/mateeyow/scrumpoker/controllers"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	collection = "scrumpoker"
	mongoURI   = "mongodb://localhost:27017"
)

var logger = log.WithFields(log.Fields{"file": "server.go"})

func main() {
	// Echo instance
	e := echo.New()
	v1 := e.Group("/v1")

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes
	e.GET("/healthz", controllers.HealthCheck)
	e.GET("/ws", controllers.Websocket)

	// Room routes
	room := v1.Group("/room")
	room.POST("/create", controllers.CreateRoom)
	room.GET("/:roomId", controllers.GetRoom)
	room.DELETE("/:roomId", controllers.DeleteRoom)

	if err := mgm.SetDefaultConfig(nil, collection, options.Client().ApplyURI(mongoURI)); err != nil {
		logger.Error("Error setting up mongodb client")
		return
	}

	// Start server
	e.Logger.Fatal(e.Start("127.0.0.1:1323"))
}
