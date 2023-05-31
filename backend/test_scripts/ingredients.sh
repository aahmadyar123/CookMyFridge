# Test script for posting new ingredients to database
echo "\nPosting new ingredient to database..."
curl -X POST -H "Content-Type: application/json" -d '{"name": "TomatoTest", "imageLink": "https://example.com/tomato.jpg", "type": "vegetable"}' http://localhost:8000/ingredients

echo "\n------------------------Done--------------------------"

# Test script for getting all ingredients from database
echo "\nGetting all ingredients from database..."
curl https://localhost:8000/ingredients

echo "\n------------------------Done--------------------------"

# Testing id operations
    # Create new ingredient for testing
    echo "\nCreating new ingredient for testing..."
    curl -X POST -H "Content-Type: application/json" -d '{"name": "Test", "imageLink": "https://example.com/test.jpg", "type": "test"}' http://localhost:8000/ingredients
    echo "\n------------------------Done--------------------------"
    # Get id of ingredient and store it in variable
    echo "\nGetting id of ingredient and storing it in a variable..."
    id=$(curl https://localhost:8000/ingredients\?name=Test | jq -r '.ingredients_list[0]._id')
    echo "\n------------------------Done--------------------------"
    # Update ingredient by id
    # echo "Updating ingredient by id..."
    # curl -X PUT -H "Content-Type: application/json" -d '{"name": "Test2", "imageLink": "https://example.com/test2.jpg", "type": "test2"}' http://localhost:8000/ingredients/$id
    # Get ingredient by id
    echo "\nGetting ingredient by id..."
    curl https://localhost:8000/ingredients/$id
    echo "\n------------------------Done--------------------------"
    # Delete ingredient by id
    echo "\nDeleting ingredient by id..."
    curl -X DELETE https://localhost:8000/ingredients/$id
    echo "------------------------Done--------------------------"

# More Tests
# ...

# Cleanup
echo "\nCleaning up..."
curl -X DELETE https://localhost:8000/ingredients\?name=TomatoTest
echo "------------------------Done--------------------------"
