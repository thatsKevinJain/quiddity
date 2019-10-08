// Connect to DB //
var mongo = require('./driver/mongoDriver')
// Figlet //
var figlet = require('figlet')

// Create a server //
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// To use mongodb anywhere in program, use this mongo middleware //
app.use(require('./middleware/mongoMiddleware'))

// Add all routes //
require('./middleware/routeOptions')(app)

mongo.getDb()
.then((db) => {
	figlet('Quiddity', function(err, data) {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		console.log(data)
	});
	app.listen(port, () => console.log(`Quiddity listening on port ${port}!`))
})
.catch((err) => {
	console.log(`Error connecting to MongoDb`)
})