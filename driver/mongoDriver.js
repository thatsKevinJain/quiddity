// This will return a MongoDB instance to interact with the DB //
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

// Connection URL
const url = process.env.MONGO_URL ||'mongodb://localhost:27017/quiddity'

// Pass options to the client //
var options = {
	useNewUrlParser: true
}

var _db;

// Use connect method to connect to the Server

var mongo = {
	connect: () => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(url, options)
			.then((db) => {
				console.log("Connected successfully to Quiddity DB")
				_db = db
				resolve(db)
			})
			.catch((err) => {
				console.log(err)
				reject(err)
			})
		})
	},

	getDb: () => _db
}

module.exports = mongo