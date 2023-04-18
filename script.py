#!/usr/bin/python3

import csv

filename = 'city.csv'

fields = []
data = []

with open(filename, 'r') as file:
	csvreader = csv.reader(file)

	fields = next(csvreader)

	for row in csvreader:
		data.append(row)