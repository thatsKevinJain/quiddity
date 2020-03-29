// This will return a MongoDB instance to interact with the DB //
const MongoClient = require('mongodb').MongoClient
const { ObjectId } = require('mongodb')
const assert = require('assert')

// Connection URL
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/'
const dbName = process.env.DB_URL || 'quiddity'

// Pass options to the client //
var options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}

var _db;
var client;

// Mongo Driver //
var mongo = {
	connect(){
		return new Promise((resolve, reject) => {

			MongoClient.connect(url, options)
			.then((clientInstance) => {
				console.log("Connected successfully to Quiddity DB")

				// Set the global instances //
				client = clientInstance
				_db = client.db(dbName)
				_db['ObjectId'] = ObjectId

				resolve(_db)
			})
			.catch((err) => {
				console.log(err)
				reject(err)
			})
		})
	},

	getDb(){
		return new Promise((resolve, reject) => {
			if(this.isConnected())
				resolve(_db)
			else
				this.connect().then(resolve).catch(reject)
		})
	},

	isConnected(){
		return !!client && !!client.topology && client.topology.isConnected()
	}
}

module.exports = mongo