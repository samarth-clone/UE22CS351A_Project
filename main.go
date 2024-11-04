package main

import (
	"UE22CS351A_Project/models"
	"UE22CS351A_Project/routes"
	"net/http"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	dataSourceName := "root:1234@tcp(127.0.0.1:3306)/ECommerceDB"
	models.InitDB(dataSourceName)

	routes.RegisterRouter(r)

	http.ListenAndServe(":8080", r)
}
