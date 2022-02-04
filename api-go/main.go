package main

import (
	"fmt"
	"takaya/pkg/base"
	"takaya/pkg/model"
)

func main() {
	db, err := base.Connect()
	if err != nil {
		panic(err)
	}
	var rows []model.Test
	if err := db.Find(&rows).Error; err != nil {
		panic(err)
	}
	fmt.Printf("len(rows): %v\n", len(rows))
}
