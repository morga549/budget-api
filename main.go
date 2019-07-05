package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/lib/pq"
)

// Budget - top level entity in the application
type Budget struct {
	id         uint
	users      pq.Int64Array
	Categories pq.StringArray
}

// Expense - baseically a transaction
type Expense struct {
	Description string
	Details     string
	Amount      float64
	userID      int
	Category    string
	budgetID    int
}

var db *sql.DB
var err error

func main() {
	router := mux.NewRouter()

	db, err = sql.Open(
		"postgres",
		os.ExpandEnv("host=${DBHOST} user=${DBUSER} port=${DBPORT} dbname=${DBNAME} sslmode=disable password=${DBPASS}"),
	)

	if err != nil {
		panic(err)
	}
	defer db.Close()

	router.HandleFunc("/expense", CreateExpense).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", router))
}

// CreateExpense used to create a new expense in the DB
func CreateExpense(w http.ResponseWriter, r *http.Request) {
	expense := Expense{"Went to Chic-fil-a.", "Needed to go there because I went to Ryan's thing", 12.37, 1, "Eating Out", 1}

	query := "INSERT INTO budget_entities.expenses (description, details, amount, userid, category, budgetid) VALUES ($1,$2,$3,$4,$5,$6)"

	stmt, err := db.Prepare(query)

	if err != nil {
		panic(err)
	}

	result, err := stmt.Exec(expense.Description, expense.Details, expense.Amount, expense.userID, expense.Category, expense.budgetID)
	fmt.Println(result)

	if err != nil {
		panic(err)
	}
}
