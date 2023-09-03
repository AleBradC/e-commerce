#!/bin/bash

# Function to import a JSON file into the specified collection
function import_collection {
  local collection_name=$1
  local file_path=$2
  mongoimport --host mongo --db ecommerce --collection $collection_name --type json --file $file_path --jsonArray
}

# Import all JSON files into MongoDB collections
import_collection "products" "/seed-data/products.json"
import_collection "browproducts" "/seed-data/browproducts.json"
import_collection "cartproducts" "/seed-data/cartproducts.json"
import_collection "cleanserproducts" "/seed-data/cleanserproducts.json"
import_collection "faceoilproducts" "/seed-data/faceoilproducts.json"
import_collection "faceserumproducts" "/seed-data/faceserumproducts.json"
import_collection "lipglossproducts" "/seed-data/lipglossproducts.json"
import_collection "lipstickproducts" "/seed-data/lipstickproducts.json"
import_collection "mascaraproducts" "/seed-data/mascaraproducts.json"
import_collection "moisturizerproducts" "/seed-data/moisturizerproducts.json"
import_collection "newarrivalproducts" "/seed-data/newarrivalproducts.json"
import_collection "productinfos" "/seed-data/productinfos.json"
