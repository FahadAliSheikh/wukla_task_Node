# wukla_task_Node
==============================
Prerequisite
Nodejs
npm
==============================
clone this project
cd into project
run command, 'npm install' to install all the packages
run command, 'npm start' to start server

==============================

//return all the recipes in database
http://localhost:8080/recipes (GET)

//this api takes values(json object) and craete new recipe
http://localhost:8080/recipes(POST)


//this api takes id of an recipe and returns that specific recipe
http://localhost:8080/recipes/:id


//this api takes recipe id and parameters to update and updateds that recipe
// get and array or objects like this: [ {"propName":"name", "value":"updated name" }]
http://localhost:8080/recipes/:id (PATCH)


//this api takes recipe id as a parameter and deletes it
http://localhost:8080/recipes/:id (DELETE)

//this api takes name as a parameter and returns results containing parameter character
http://localhost:8080/recipes/name/:name

//this api will take recipe id and rating value, to add rating of that recipe
http://localhost:8080/recipes/:recipeId/rating

==============================
Acknoledgements
https://stackoverflow.com/questions/3305561/how-to-query-mongodb-with-like
