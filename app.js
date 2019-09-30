const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Add all routes //
require('./middleware/routeOptions')(app)

// Connect to DB //
var mongo = require('./driver/mongoDriver')

app.listen(port, () => console.log(`Quiddity listening on port ${port}!`))