package main

import (
	"UE22CS351A_Project/models"
	"UE22CS351A_Project/routes"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"

	"github.com/gorilla/mux"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r := mux.NewRouter()

	username := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dataSourceName := username + ":" + password + "@tcp(127.0.0.1:3306)/" + dbName
	models.InitDB(dataSourceName)

	routes.RegisterRouter(r)

	http.ListenAndServe(":8080", r)
}
