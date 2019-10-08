// Collection - Queue //
const QUEUE = 'queue'

module.exports = {

	fetchMessage: function(req, res){

		req.db.collection(QUEUE).find({}).toArray()
		.then((data) => {
			res.json(data)
		})
		.catch(console.log)
	},

	deleteMessage: function(req, res){

		req.db.collection(QUEUE).removeOne({})
		.then((data) => {
			res.json(data)
		})
		.catch(console.log)
	},

	addMessage: function(req, res){
		
		req.db.collection(QUEUE).insertOne(req.body)
		.then((data) => {
			res.json(data)
		})
		.catch(console.log)
	}
}