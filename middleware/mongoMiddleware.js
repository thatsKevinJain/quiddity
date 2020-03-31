// This function will allow access to mongo db via the req variable //
var mongo = require('../driver/mongoDriver')

const ERR_DB_CONNECT = "Could not connect to queue service."

module.exports = function(req, res, next){
	mongo.getDb()
	.then((db) => {
		req.db = db
		next()
	})
	.catch((err) => {
		res.status(400).json({message: ERR_DB_CONNECT})
	})
}