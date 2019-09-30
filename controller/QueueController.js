var mongo = require('../driver/mongoDriver')

module.exports = {
	fetchMessage: function(req, res){

		mongo.getDb()
		.then(db => {
			db.collection('test').findOne({})
			.then((data) => {
				res.json(data)
			})
			.catch(console.log)
		})
		.catch(err => console.log(err))
	},
	deleteMessage: function(req, res){

		mongo.getDb()
		.then(db => {
			db.collection('test').removeOne({})
			.then((data) => {
				res.json(data)
			})
			.catch(console.log)
		})
		.catch(err => console.log(err))
	}
}