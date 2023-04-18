#!/usr/bin/python3

import csv
import json

filename = 'city.csv'

fields = []
rows = []

with open(filename, 'r') as file:
	csvreader = csv.reader(file)

	fields = next(csvreader)

	for row in csvreader:
		rows.append(row)

fields[0] = 'name'

required = ['name', 'capital_marker', 'geo_lat', 'geo_lon', 'population']

idx = {}

for item in required:
	idx[item] = fields.index(item)

for row in rows:
	row[idx['name']] = row[idx['name']][row[idx['name']].find('г ') + 2:]

for row in rows:
	if (row[idx['capital_marker']] == '2'):
		row[idx['capital_marker']] = 1
	else:
		row[idx['capital_marker']] = 0
	

data = []

for row in rows:
	data.append({});
	data[-1]['name'] = row[idx['name']]
	data[-1]['capital_marker'] = row[idx['capital_marker']]
	data[-1]['geo_lat'] = float(row[idx['geo_lat']])
	data[-1]['geo_lon'] = float(row[idx['geo_lon']])
	data[-1]['population'] = int(row[idx['population']])

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)