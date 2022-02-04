package main

import "takaya/pkg/base"

func main() {
	db, err := base.Connect()
	if err != nil {
		panic(err)
	}
	if err := base.MigrateTables(db); err != nil {
		panic(err)
	}
}
