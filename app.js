// Connect to DB //
var mongo = require('./driver/mongoDriver')

// Create a server //
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoMiddleware = require('./middleware/mongoMiddleware')

// To use mongodb anywhere in program, use this mongo middleware //
app.use(mongoMiddleware)

// Add all routes //
require('./middleware/routeOptions')(app)

app.listen(port, () => console.log(`Quiddity listening on port ${port}!`))