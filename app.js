const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Add all routes //
require('./middleware/routeOptions')(app)

// Connect to DB //
var mongo = require('./driver/mongoDriver')

mongo.connect()
.then(db => console.log(db))
.catch(err => console.log(err))

app.listen(port, () => console.log(`Quiddity listening on port ${port}!`))