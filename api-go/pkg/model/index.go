package model

import "gorm.io/gorm"

type Test struct {
	gorm.Model
	Name string
}
