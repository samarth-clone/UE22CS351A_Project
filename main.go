package main

import (
	"UE22CS351A_Project/models"
	"UE22CS351A_Project/routes"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Initialize router
	r := mux.NewRouter()

	// Setup database connection using environment variables
	username := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dataSourceName := username + ":" + password + "@tcp(127.0.0.1:3306)/" + dbName
	models.InitDB(dataSourceName)

	// Register application routes
	routes.RegisterRouter(r)

	// Define allowed origins and wrap the router with CORS middleware
	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:5173"}),                 // Allow only this origin
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "PATCH"}), // Allow specific methods
		handlers.AllowedHeaders([]string{"Content-Type"}),                          // Allow headers such as "Content-Type"
	)

	// Start the server with CORS-enabled router
	http.Handle("/", r)
	log.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", corsHandler(r)))
}
