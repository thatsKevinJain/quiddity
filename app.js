// Connect to DB //
var mongo = require('./driver/mongoDriver')

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
	require('./api/services/figlet')
	app.listen(port, () => console.log(`Quiddity listening on port ${port}!`))
})
.catch((err) => {
	console.log(`Error connecting to MongoDb`)
})