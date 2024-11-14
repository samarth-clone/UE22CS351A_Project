package models

type getTransaction struct {
	TransactionID   int
	CustomerID      int
	Total           int
	PaymentMethod   string
	TransactionDate string
}

func RecordTransaction(transaction Transaction) (int, error) {
	query := `INSERT INTO transaction (CustomerID, Total, PaymentMethod) VALUES (?, ?, ?);`
	result, err := db.Exec(query, transaction.CustomerID, transaction.Total, transaction.PaymentMethod)
	if err != nil {
		return 0, err
	}

	transactionID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(transactionID), nil
}

func GetCustomerTransactions(customerID int) ([]getTransaction, error) {
	query := `SELECT TransactionID, CustomerID, Total, TransactionDate, PaymentMethod FROM transaction WHERE CustomerID = ?;`

	rows, err := db.Query(query, customerID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	transactions := []getTransaction{}
	for rows.Next() {
		var transaction getTransaction
		err := rows.Scan(&transaction.TransactionID, &transaction.CustomerID, &transaction.Total, &transaction.TransactionDate, &transaction.PaymentMethod)
		if err != nil {
			return nil, err
		}
		transactions = append(transactions, transaction)
	}

	return transactions, nil
}
